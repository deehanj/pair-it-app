import {connect} from 'react-redux';
import VideoChatComponent from './VideoChatComponent';
import {UpdateURL} from './VideoChatActionCreators';

function mapStateToProps (state) {
	return {
		URL: state.VideoChat.URL,
	};
};

function mapDispatchToProps (dispatch) {
	return {
		UpdateStream: function(stream){
			// const URLObject = URL.createObjectURL(stream);
			// dispatch(UpdateURL(URLObject));
			dispatch(UpdateURL(stream))
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChatComponent)
