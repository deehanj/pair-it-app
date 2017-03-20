import {connect} from 'react-redux';
import VideoChatComponent from './VideoChatComponent';
import {UpdateURL} from './VideoChatActionCreators';

const mapStateToProps = (state) => {
	return {
		URL: state.VideoChat.URL,
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
