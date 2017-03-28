const electron = window.require('electron');
const ipcRenderer = window.require('electron').ipcRenderer;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const shell = electron.shell;

import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../reducers/auth';
import options from '../utils/github.settings';

export class LoginComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.gitInfo.login && true) {
      ipcRenderer.send('reopen-window');
      this.context.router.push('/repos');
    }
  }

  authGithub () {
    var self = this;

    //Build the OAuth consent page URL
    var authWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
      webPreferences: {
        nodeIntegration: false
      }
    });
    var githubUrl = 'https://github.com/login/oauth/authorize?';
    var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scope;
    authWindow.loadURL(authUrl);

    function handleCallback (url) {
      var raw_code = /code=([^&]*)/.exec(url) || null;
      var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(url);

      if (code || error) {
        // Close the browser if code found or error
        authWindow.destroy();
      }

      // If there is a code, proceed to get token from github
      if (code) {
        self.requestGithubToken(code);
      } else if (error) {
        alert('Oops! Something went wrong and we couldn\'t ' +
          'log you in using Github. Please try again.');
      }
    }

    // If "Done" button is pressed, hide "Loading"
    authWindow.on('close', function () {
      authWindow.destroy();
    });

    authWindow.webContents.on('will-navigate', function (event, url) {
      handleCallback(url);
    });

    authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
      handleCallback(newUrl);
    });
  }

  requestGithubToken(code) {
    this.props.loginUser(code);
  }

  linkToGithub() {
    shell.openExternal('https://github.com/jjdeehan/capstone');
  }

  render() {
    return (
      <div className="container-fluid main-container login">
        <div className="row">
          <div className="offset-xs-2 col-xs-12">
            <img className="img-responsive logo logo-landing" src="images/pairit.logotitle.svg" />
            {/*<img className="img-responsive logo logo-landing" src="images/pairit.logo.svg" />
            <img className="img-responsive logo title-landing" src="images/pairit.title.svg" />*/}
            <div className="desc">
              <h1>Welcome to Pair.it!</h1>
              Pair program from anywhere with your collaborators.
              <br />Start by logging in with your Github account.
            </div>
            <button className="btn btn-lg btn-block login-button" onClick={this.authGithub.bind(this)}>
              <i className="fa fa-github" /> Log in to GitHub
            </button>
          </div>
        </div>
        <footer>
          <div className='callToAction' onClick={this.linkToGithub} >
            <i className="fa fa-github" /> Check out our repo on Github
          </div>
        </footer>
      </div>
    );
  }
}

LoginComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    response: state.auth.response,
    failed: state.auth.failed,
    isFetching: state.auth.isFetching,
    gitInfo: state.user.gitInfo
  };
}

export default connect(mapStateToProps, { loginUser })(LoginComponent);
