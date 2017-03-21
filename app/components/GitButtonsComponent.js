import React from 'react';
import simpleGit from 'simple-git'
import chalk from 'chalk';


const Git;

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			displayBranchList:false,
			currentBranch
		};
		this.handleGitAdd = this.handleGitAdd.bind(this);
		this.handleGitCommit = this.handleGitCommit.bind(this);
		this.handleGitPush = this.handleGitPush.bind(this);
		this.handleGitPull = this.handleGitPull.bind(this);
		Git = simpleGit(this.props.workingDirPath);
		this.getBranchList = this.getBranchList.bind(this);
		this.getCurrentBranch = this.getCurrentBranch.bind(this);
		this.handleBranchList = this.handleBranchList.bind(this);
	}

	componentDidMount(){
		this.getBranchList();
		this.getCurrentBranch();
	}

	getBranchList(){
		Git.branchLocal(this.handleBranchList);
	}

	handleBranchList(error, branchSummary){
		this.setState({branchList: branchSummary});
	}

	getCurrentBranch(){

	}

	toggleShowingBranchList(){
		let toggle = (this.state.displayBranchList) ? false : true;
		this.setState({displayBranchList:toggle});
	}

	handleGitAdd(){
		Git.add('./*', errorHandler);
	}

	handleGitStatus(){
		Git.status(this.handleStatus);
	}

	handleStatus(status){
		this.setState({successData:status})
	}

	handleCommitMessage(string){
		this.setState({commitMessage:string})
	}

	handleDestinationBranch(){
		Git.checkoutLocalBranch(this.state.destinationBranchQuery, errorHandler)
	}

	handleGitCommit(){
		Git.commit(this.state.commitMessage, errorHandler);
	}

	handleGitPush(){
		// Git.push
	}

	handleGitPull(){

	}

	handleBranchCheckout(string){
		this.setState({destinationBranchQuery:string});
	}

	errorHandler(error, data){
		this.setState({successData:data});
		this.setState({errorMessage:error});
	}

	render(){
		return (
			<div>
				{this.state.successData}
				{this.state.errorMessage}
				<form onSubmit={this.handleDestinationBranch}>
					Checkout Branch
					<input type="text" onChange={this.handleBranchCheckout}></input>
				</form>
				<button onClick={this.handleGitAdd}>Add Files</button>
				<form onSubmit={this.handleGitCommit}>
					Commit
					<input type="text" onChange={this.handleCommitMessage}></input>
				</form>
				<button onLcick={this.handleGitStatus}>Status</button>
				<button onClick={this.handleGitPush}>Push</button>
				<button onClick={this.handleGitPull}>Pull</button>
				<button onClick={this.toggleShowingBranchList}></button>
				{this.state.displayBranchList && this.state.branchList.map(el =>
						if (el === currentBranch){
							<ul>{chalk.green(el)}</ul>
						} else {
							<ul>el</ul>
						}
					)
				}
			</div>
			)
	}

}