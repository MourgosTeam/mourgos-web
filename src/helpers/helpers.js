import 'whatwg-fetch'

const dev = true
export function GetIt(url, method, token, body){
	if(dev){
		url = "http://localhost:3001" + url;
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

