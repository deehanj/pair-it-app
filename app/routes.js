// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import store from './store/configureStore';
import axios from 'axios'

// import { setFileDir, loadFiles } from './reducers/FilesReducer';
// import { getAllFiles } from './utils/FileSystemFunction'




// export const fetchFilesFromDisk = () => {
// 	console.log('am I running??')
  
// 	getAllFiles('../puppy-book')
// 	.then(array => JSON.parse(array))
// 	.then(result => console.log(result))
// 	.catch(error => console.error(error.message))
// }


//   .then(response => response.data)
//   .then(files => {
//     store.dispatch(setFileDir(dir))
//     store.dispatch(loadFiles(files))
//   })
//   .catch(err => console.error(err))
// }

  

//   .then(arr => {
//     res.json(arr)
//   })
//   .catch(next)

// })


export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
  </Route>
);
