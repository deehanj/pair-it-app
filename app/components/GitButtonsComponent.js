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
	}

	componentDidMount() {
		this.getBranchList();
	}

	getBranchList() {
		Git.branchLocal(
			(error, branchSummary) => {
				this.props.updateBranchList(branchSummary);
				if (error) {
					this.props.handleError(error);	
				}
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
							if(error){
								this.props.handleError(error)
							} else {
								this.props.handleStatus(success);
							}
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
			(error, success) => {
				if (error){
					this.props.handleError(error)
					console.log(error)
				} else {
					console.log(success)
				}
			}
			)
	}

	handleBranchCheckout(e) {
		e.preventDefault();
		const branchInput = document.getElementById('branchInput')
		Git.checkout(
			this.props.branchQuery, 
			(error, newBranch) => {
				if(error){
					this.props.handleError(error);
					branchInput.style.cssText = "color:red;"
					console.log(branchInput.style)
				} else {
					this.props.handleSuccess('checked out branch: ' + this.props.branchQuery)
					branchInput.value = ''
				}
			}
		)
		this.props.toggleDisplayBranches()
	}

	render(){
		return (
			<div>
				{this.props.currentBranch && 'working on branch: ' + this.props.currentBranch}
				{/*this.props.branchList && this.props.branchList.map(
					(branch) => {
						<ol> {branch} </ol>
					}
					)
				*/}
				{this.props.successData }
				{this.props.errorData }
				<form onSubmit={this.handleBranchCheckout} >
					<input type="text" id="branchInput" onChange={this.props.handleBranchChangeQuery}></input>
					<button onClick={this.handleBranchCheckout}>Checkout Branch</button>
				</form>
				
				<button onClick={this.handleGitAdd}>Add Files</button>
				<form onSubmit={this.handleCommit}>
					<button onClick={this.handleCommit} >Commit</button>
					<input type="text" onChange={this.props.handleCommitMessage}></input>
				</form>
				<button onClick={this.handleStatus}>Status</button>
				<button onClick={this.handleGitPush}>Push</button>
				<button onClick={this.handleGitPull}>Pull</button>
				<button onClick={this.props.toggleDisplayBranches}>ShowBranchList</button>
				{this.state.displayBranchList && this.state.branchList.map(el => {
						if (el === currentBranch){
							return <ul>{chalk.green(el)}</ul>
						} else {
							return <ul>el</ul>
						}
					}
					)
				}
			</div>
			)
	}

}