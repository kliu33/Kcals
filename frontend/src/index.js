import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { restoreSession } from './store/csrf';



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const initializeApp = () => {
//   ReactDOM.render(
//       <React.StrictMode>
//       <Provider store={store}>
//           <App />
//       </Provider>
//       </React.StrictMode>,
//       document.getElementById('root')
//   );
// }

// restoreSession().then(initializeApp)