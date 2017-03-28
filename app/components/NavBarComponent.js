import React from 'react'
import {connect} from 'react-redux'

const shell = window.require('electron').shell


const mapStateToProps = (state) => {
	return {
		user: state.user.gitInfo,
	}
}

class NavComponent extends React.Component {

  goToRemoteLink(url) {
		shell.openExternal(url);
	}

	render (){
		return (
      <nav className="row navigation-bar">
        <img className="img logo logo-nav" src="images/pairit.logotitle.svg" onClick={this.props.dispatchReturnToLogin} />

        <div className="signed-in-user" onClick={() => this.goToRemoteLink(this.props.user.html_url)}>
          <img className="login-avatar" src={this.props.user.avatar_url} />
          <h5 className="user-name">{this.props.user.login}</h5>
          <br />
          <h5 className="user-name">logout</h5>

        </div>

      </nav>
		)
	}

}

export default connect(mapStateToProps)(NavComponent)
