export default function _fetch(url, method, body, callback) {
  //method = "GET"일 경우 body = null
  if(body) {
    body = JSON.stringify(
      body
    )
  }
  fetch(process.env.REACT_APP_HOST + url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body
  })
  .then(response => {
    if (!response.ok) {
    throw Error(response.statusText)
    } else {
    return response.json();
    }
  })
  .then(data => {
    callback(data);
  })
  .catch(err => {
    alert(err);
  })
}

export function _fetchStatus(url, method, body, callback) {
  //method = "GET"일 경우 body = null
  if(body) {
    body = JSON.stringify(
      body
    )
  }
  fetch(process.env.REACT_APP_HOST + url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body
  })
  .then(response => {
    callback(response.status)
  })
}

