export default function _handlePost(url, method, body, callback) {
  fetch(process.env.REACT_APP_HOST + url, {
    method: method,
    'Content-Type': 'multipart/form-data',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
    body: body
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

