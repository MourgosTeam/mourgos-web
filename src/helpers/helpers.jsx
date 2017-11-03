import React, { Component } from 'react';
import 'whatwg-fetch'

const dev = true
export function GetIt(url, method, token, body){
	if(dev){
		url = "http:\/\/localhost:3001" + url;
	}
	return fetch(url, {
		method: method,
		body: JSON.stringify(body),
  		headers: {
    		"Content-Type": "application/json",
    		"Token" : token
  		}
	});
}

export function ImageCover(props){
	return (<div className="image-cover" style={{backgroundImage:'url('+props.src+')'}}>
			</div>);
}