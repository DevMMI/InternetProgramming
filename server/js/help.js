
function logoutButton(){
  //post('/contact/', {name: 'Johnny Bravo'});
  console.log("help!!");
  post('/logout', {}, 'GET');
}

function post(path, params, method) { // src https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function handleLogin(){
  var login = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var post = $.post( "/login", {"username": login, "password": password});

  post.done(function(data){
    console.log(data);

  })

}
