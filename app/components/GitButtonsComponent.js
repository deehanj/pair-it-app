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
					console.error(error)
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
					console.error(error)
				} else {
					this.props.handleSuccess(this.props.commitMessage);
					setTimeout(this.handleStatus, 4000);
				}
			}
		)
		document.getElementById('commit').value = null;
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
		return (
			<div>
			<footer>
				<div className="footer"><i className="fa fa-git"/></div>

				<form className="footer" onSubmit={this.handleBranchCheckout} >
					<div className="footer" onClick={this.handleBranchCheckout}>Checkout Branch</div>
					<input className="footer" type="text" id="branchInput" onChange={this.props.handleBranchChangeQuery}></input>
				</form>

				<div className="footer footer-btn" onClick={this.handleGitAdd}>Add Files</div>

				<form id="commit" className="footer" onSubmit={this.handleCommit}>
					<div className="footer" onClick={this.handleCommit}>Commit</div>
					<input className="footer" type="text" onChange={this.props.handleCommitMessage}></input>
				</form>

				<div className="footer footer-btn" onClick={this.handleStatus}>Status</div>
				<div className="footer footer-btn" onClick={this.handleGitPush}>Push</div>
				<div className="footer footer-btn" onClick={this.handleGitPull}>Pull</div>
				<div className="footer footer-btn" onClick={this.props.toggleDisplayBranches}>Show BranchList</div>
				{this.props.displayBranch && this.props.branchList.map(el => {
							return (
								<div>
									<ul>{el.name + ' :  ' + el.label}</ul>
								</div>
							)
						// }
					}
					)
				}
			</footer>
			</div>
			)
	}

}
