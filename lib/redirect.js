function redirect_init () {
  /*
  Lookup the hash fragment, get and store the access token into the browser’s local storage.
  Then invoke the original callback function.
  Finally, close the current popup window.
  On failure, log the error and still close the current popup window.
  */

  console.log(location);
  localStorage.setItem('hash', location.hash);
  var settings = JSON.parse(localStorage.getItem('imgurSettings'));
  console.log(settings);

  var callback = settings.callback_function;
  console.log(callback);
  var status = opener.eval(callback)();
  console.log(status);

  window.close();
}

redirect_init();