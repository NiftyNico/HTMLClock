function init (settings) {
  /*
  Stores the following
  ---------------------------------
   - client_id
   - type (code or token)
   - callback_function
  */
  localStorage.setItem('imgurSettings', JSON.stringify(settings));
}

function login () {
  var settings = JSON.parse(localStorage.getItem('imgurSettings'));
  console.log(settings);
  var url = 'https://api.imgur.com/oauth2/authorize?client_id=' + settings.client_id + '&response_type=' + settings.type + '&state=anythingiwanthere';

  var newWindow = window.open(url, 'Login to IMGUR','height=800, width=800');
  if (window.focus) {
    newWindow.opener = this.window;
    newWindow.focus()
  }
}

function imgurCallback () {
  console.log('YO DOG WE CALLBACKED');
  var regex = /([^&=]+)=([^&]*)/g;
  var tokens = regex.exec(localStorage.getItem('hash'));
  var accessToken = tokens[tokens.length - 1];
  var url = 'https://api.imgur.com/3/account/me';

  function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  }

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      alert('Logged in as: ' + data.data.url); 
    },
    error: function (data) { 
      console.log(JSON.stringify(data));
      alert(JSON.stringify(data)); 
    },
    beforeSend: setHeader
  });

  /*console.log(url);
  $.get(url, function (data) {
    console.log('WERE BACK: ' + JSON.stringify(data));
    alert(accessToken + JSON.stringify(data));
  });*/
}