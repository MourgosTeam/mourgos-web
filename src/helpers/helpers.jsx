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

const darkenBackgroundAmount = 0.3;
export function BackgroundImage(imageUrl, logo) { // for logo use contain no-repeat
  if(!imageUrl){
    return {
      backgroundColor : '#777',
      border : '1px solid #cecece'
    }
  }
  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darkenBackgroundAmount}),
                                      rgba(0, 0, 0, ${darkenBackgroundAmount})),
                      url(${imageUrl})`,
    backgroundSize: (logo)?"contain":"cover",
    backgroundPosition : "center",
    backgroundRepeat : "no-repeat"
  };
}
