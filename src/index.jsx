import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Coming from './components/Coming.jsx';
import Problem from './components/Problem.jsx';
import About from './components/About.jsx';
//import registerServiceWorker from './registerServiceWorker';

import {GetIt} from './helpers/helpers';

let rightnow = new Date();
let aftermath = new Date( 2018, 0, 9, 11, 0, 0, 0);

GetIt('/globals/mourgos/status', 'GET').then((data) => data.json())
.then((data) => {
    console.log(data);
  return parseInt(data.Status, 10) || 0;
})
.then(openSite)
.catch((e) => openSite(0));

function openSite(v) {
    console.log(v);
    console.log(v);
    console.log(v);
    if (window.location.pathname === "/about/") {
        ReactDOM.render(<About />, document.getElementById('root'));
    } else if (rightnow < aftermath && localStorage.getItem('dev') !== '1') {
        ReactDOM.render(<Coming />, document.getElementById('root'));
    } else if (v === 2) {
        ReactDOM.render(<Problem />, document.getElementById('root'));
    } else{
        ReactDOM.render(<App />, document.getElementById('root'));
    }
}
//registerServiceWorker();
