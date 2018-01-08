import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Coming from './components/Coming.jsx';
import About from './components/About.jsx';
//import registerServiceWorker from './registerServiceWorker';


let rightnow = new Date();
let aftermath = new Date( 2018, 0, 9, 11, 0, 0, 0);


if (window.location.pathname === "/about/") {
	ReactDOM.render(<About />, document.getElementById('root'));
}
else if (rightnow < aftermath && localStorage.getItem('dev') !== '1') {
	ReactDOM.render(<Coming />, document.getElementById('root'));
}
else{
	ReactDOM.render(<App />, document.getElementById('root'));
}
//registerServiceWorker();
