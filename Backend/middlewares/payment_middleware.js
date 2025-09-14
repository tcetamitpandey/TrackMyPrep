const url = 'https://test.payu.in/_payment';
const options = {
  method: 'POST',
  headers: {accept: 'text/plain', 'content-type': 'application/x-www-form-urlencoded'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));