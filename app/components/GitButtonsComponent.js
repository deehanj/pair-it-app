import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';


let Git = simpleGit();

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			displayBranchList:false,
		}
		this.handleBranchCheckout = this.handleBranchCheckout.bind(this);
		this.getBranchList = this.getBranchList.bind(this);
		this.handleGitAdd = this.handleGitAdd.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleCommit = this.handleCommit.bind(this);
		this.handleGitPush = this.handleGitPush.bind(this);
		this.handleGitPull = this.handleGitPull.bind(this);
	}

	componentDidMount() {
		this.getBranchList();
	}

	getBranchList() {
		Git.branchLocal(
			(error, branchSummary) => {
				this.props.updateBranchList(branchSummary);
					this.props.handleError(error);	
			}
		);
	}

	handleGitAdd() {
		Git.add(
			'./*',
			(error, success) => {
				if(error){
					this.props.handleError(error)
					console.log(error)
				} else {
					Git.status(
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
		Git.status(
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
		Git.commit(
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
		Git.checkout(
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
		this.props.toggleDisplayBranches()
	}

	handleGitPush() {
		Git.push(
			'origin', 
			this.props.currentBranch,
			(error, success) =>{
				this.props.handleError(error);
				this.props.handleSuccess(success);
			} )
		this.handleStatus(); 
	}

	handleGitPull() {
		Git.pull(
			'origin',
			this.props.currentBranch,
			(error, success) => {
				this.props.handleError(error);
				const successMessage = 'insertions: ' + success.insertions + '\n' + 'deletions: ' + success.deletions + '\n' + 'changes: '+ success.changes
				console.log(success)
				this.props.handleSuccess(successMessage);
			}
			)
	}

	render(){
		console.log(this.props.branchList)
		return (
			<div>
				<h2 id="currentBranch">
				{this.props.currentBranch && 'working on branch: ' + this.props.currentBranch}
				</h2>
				{/*this.props.branchList && this.props.branchList.map(
					(branch) => {
						<ol> {branch} </ol>
					}
					)
				*/}
				{/* SUCCESS MESSAGE */}
				{this.props.successData }
				{/* ERROR MESSAGE */}
				{this.props.errorData }
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
				{/* PUSH */}
				<button onClick={this.handleGitPush}>Push</button>
				{/* PULL */}
				<button onClick={this.handleGitPull}>Pull</button>
				{/*  */}
				<button onClick={this.props.toggleDisplayBranches}>ShowBranchList</button>
				{/*  */}
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