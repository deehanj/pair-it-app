import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';




export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			displayBranchList:false,
			receivedProps:false,
		}
		this.handleBranchCheckout = this.handleBranchCheckout.bind(this);
		this.getBranchList = this.getBranchList.bind(this);
		this.handleGitAdd = this.handleGitAdd.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleCommit = this.handleCommit.bind(this);
		this.handleGitPush = this.handleGitPush.bind(this);
		this.handleGitPull = this.handleGitPull.bind(this);


		this.Git = simpleGit();
	}

	componentWillReceiveProps(nextProps) {
		
		if (!this.state.receivedProps) {
			this.Git.cwd(nextProps.dir)
			this.getBranchList();
			this.setState({receivedProps:true})
		}
	}

	getBranchList() {
		this.Git.branchLocal(
			(error, branchSummary) => {
				this.props.updateBranchList(branchSummary);
					this.props.handleError(error);	
			}
		);
	}

	handleGitAdd() {
		this.Git.add(
			'./*',
			(error, success) => {
				if(error){
					this.props.handleError(error)
					console.log(error)
				} else {
					this.Git.status(
						(error, success) => {
							this.props.handleError(error)
							this.props.handleStatus(success)
						}
					)
				}
			},
		);
	}

	handleStatus() {
		this.Git.status(
			(error, success) => {
				if(error){
					this.props.handleError(error)
				} else {
					this.props.handleStatus(success);
				}
			}
		)
	}

	handleCommit(e) {
		e.preventDefault();
		this.Git.commit(
			this.props.commitMessage,
			null,
			null,
			(error, success) => {
				if (error){
					this.props.handleError(error)
					console.log(error)
				} else {
					this.props.handleSuccess(this.props.commitMessage);
					setTimeout(this.handleStatus, 4000);
				}
			}
		)
	}

	handleBranchCheckout(e) {
		e.preventDefault();
		const branchInput = document.getElementById('branchInput')
		const branchName = document.getElementById('currentBranch')
		this.Git.checkout(
			this.props.branchQuery, 
			(error, newBranch) => {
				if(error){
					this.props.handleError(error);
					branchInput.style.cssText = "color:red;"
					console.log(branchInput.style)
				} else {
					this.props.handleSuccess('checked out branch: ' + this.props.branchQuery)
					if(this.props.branchQuery === 'master'){
						branchName.style.cssText = "color:blue;"
					}
					branchInput.value = ''
				}
			}
		)
		this.getBranchList()
		this.props.toggleDisplayBranches()
	}

	handleGitPush() {
		this.Git.push(
			'origin', 
			this.props.currentBranch,
			(error, success) =>{
				this.props.handleError(error);
				this.props.handleSuccess(success);
			} )
		this.handleStatus(); 
	}

	handleGitPull() {
		this.Git.pull(
			'origin',
			this.props.currentBranch,
			(error, success) => {
				this.props.handleError(error);
				const successMessage = 'insertions: ' + success.summary.insertions + '\n' + 'deletions: ' + success.summary.deletions + '\n' + 'changes: '+ success.summary.changes;
				this.props.handleSuccess(successMessage);
			}
			)
	}

	render(){
		console.log(this.props.dir)
		return (
			<div>
				<h2 id="currentBranch">
				{/* CURRENT BRANCH NAME*/}
				{this.props.currentBranch && 'working on branch: ' + this.props.currentBranch}
				</h2>
				{/* SUCCESS MESSAGE */}
				{/*this.props.successData*/}
				{/* ERROR MESSAGE */}
				{/*this.props.errorData */}
				{/* BRANCH CHECKOUT - DONE */}
				<form onSubmit={this.handleBranchCheckout} >
					<button onClick={this.handleBranchCheckout}>Checkout Branch</button>
					{/* BRANCH NAME TO BE CHECKED OUT */}
					<input type="text" id="branchInput" onChange={this.props.handleBranchChangeQuery}></input>
				</form>
				{/* ADD - DONE */}
				<button onClick={this.handleGitAdd}>Add Files</button>
				{/* COMMIT - DONE*/}
				<form onSubmit={this.handleCommit}>
					<button onClick={this.handleCommit} >Commit</button>
					{/* COMMIT MESSAGE - DONE */}
					<input type="text" onChange={this.props.handleCommitMessage}></input>
				</form>
				{/* STATUS - DONE */}
				<button onClick={this.handleStatus}>Status</button>
				{/* PUSH DONE */}
				<button onClick={this.handleGitPush}>Push</button>
				{/* PULL DONE */}
				<button onClick={this.handleGitPull}>Pull</button>
				{/* TOGGLE DONE */}
				<button onClick={this.props.toggleDisplayBranches}>ShowBranchList</button>
				{/* BRANCH DISPLAYED */}
				{this.props.displayBranch && this.props.branchList.map(el => {
						// if (el === currentBranch){
						// 	return <ul>{chalk.green(el)}</ul>
						// } else {
							return (
								<div>
									<ul>{el.name + ' :  ' + el.label}</ul>
								</div>
							)
						// }
					}
					)
				}
			</div>
			)
	}

}