import React from 'react'
import {connect} from 'react-redux'

import { logout } from '../reducers/AuthReducer'
import { removeUser } from '../actionCreators/UserActionCreators'
import { clearRepos } from '../actionCreators/RepoActionCreators'
import { push } from 'react-router-redux'

const shell = window.require('electron').shell

const logo = require('img/pairit.logotitle.svg');

const mapStateToProps = (state) => {
	return {
		user: state.user.gitInfo,
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		logoutUser: () => {
		  dispatch(logout())
			dispatch(removeUser())
			dispatch(clearRepos())
			dispatch(push('/login'))
		}
	}
}

class NavComponent extends React.Component {

  goToRemoteLink(url) {
		shell.openExternal(url);
	}

	render (){
		return (
      <nav className="row navigation-bar">
        <img className="img logo logo-nav" src={logo} />

        <div className="signed-in-user" >
          <img
						className="login-avatar"
						onClick={() => this.goToRemoteLink(this.props.user.html_url)}
						src={this.props.user.avatar_url} />
          <h5
						className="user-name"
						onClick={() => this.goToRemoteLink(this.props.user.html_url)} >{this.props.user.login}</h5>
          <br />
          <h5
						className="user-name"
						onClick={() => this.props.logoutUser()}
						>logout</h5>

        </div>

      </nav>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent)
