import React from 'react';
import 'whatwg-fetch'

export function GetIt(url, method, body, token){
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

export function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = false;
    ref.parentNode.insertBefore(script, ref);
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
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: (logo)?"contain":"cover",
    backgroundPosition : "center",
    backgroundRepeat : "no-repeat"
  };
}
export function BackgroundGradientImage(imageUrl, logo) { // for logo use contain no-repeat
  if(!imageUrl){
    return {
      backgroundColor : '#777',
      border : '1px solid #cecece'
    }
  }
  return {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${darkenBackgroundAmount}),
                                      rgba(0, 0, 0, ${darkenBackgroundAmount-0.2})),
                      url(${imageUrl})`,
    backgroundSize: (logo)?"contain":"cover",
    backgroundPosition : "center",
    backgroundRepeat : "no-repeat"
  };
}