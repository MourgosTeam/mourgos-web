import React from 'react';
import 'whatwg-fetch'

export function GetIt(url, method, token, body){
  url = "/api" + url;

  console.log("Fetching " + url);
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
