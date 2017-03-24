import {connect} from 'react-redux';
import VideoChatComponent from './VideoChatComponent';
import {UpdateURL} from './VideoChatActionCreators';

const mapStateToProps = (state) => {
	return {
		URL: state.VideoChat.URL,
		name: state.user.gitInfo.login,
		id: state.user.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		UpdateStream: (stream) => {
			dispatch(UpdateURL(stream))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChatComponent)
