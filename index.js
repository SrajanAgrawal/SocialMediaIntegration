/*================================ FaceBook Login ===================================*/

var fimage = document.querySelector('#fimg');
var fname = document.querySelector('#fname');
var fmail = document.querySelector('#fmail');
var flo = document.querySelector('#logout');
var fDetails = document.querySelector('#facebookDetails');
var facebook = document.querySelector('#facebook');
var google = document.querySelector('#google');
var account = document.querySelector('#account');

fimage.style.display = 'none';
fname.style.display = 'none';
fmail.style.display = 'none';
flo.style.display = 'none';
fDetails.style.display = 'none';

window.fbAsyncInit = function() {
    FB.init({
        appId      : '367268955234423',
        cookie     : true,
        xfbml      : true,
        version    : 'v11.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserData();
        } else {
            FB.login(function(response){
                if(response.authResponse){
                    getUserData();
                } else {
                    console.log("Not Authorized.")
                }
            }, {scope: 'email, public_profile', return_scopes: true});
        }
    });
}

function getUserData(){
    FB.api('/me', {fields: 'name,email,picture.type(large)'}, function(response) {
        fimage.setAttribute('src', response.picture.data.url);
        fname.innerHTML = 'Name: ' + response.name;
        fmail.innerHTML = 'Email: ' + response.email;

        fimage.style.display = 'inline-block';
        fname.style.display = 'inline-block';
        fmail.style.display = 'inline-block';
        flo.style.display = 'inline-block';
        fDetails.style.display = 'inline-block';
        facebook.style.display = 'none';
        google.style.display = 'none';
        account.style.display = 'none';
    });
}

function logout() {
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            FB.logout(function(response){
                fimage.style.display = 'none';
                fname.style.display = 'none';
                fmail.style.display = 'none';
                flo.style.display = 'none';
                fDetails.style.display = 'none';
                facebook.style.display = 'flex';
                google.style.display = 'flex';
                account.style.display = 'flex';
            });
        } else {
            console.log("Unauthorized Logout.")
        }
    });
}


/*============================== Google Login ===============================*/

var gimage = document.querySelector('#gimg');
var gname = document.querySelector('#gname');
var gmail = document.querySelector('#gmail');
var gso = document.querySelector('#signout');
var gDetails = document.querySelector('#GoogleDetails');

gimage.style.display = 'none';
gname.style.display = 'none';
gmail.style.display = 'none';
gso.style.display = 'none';
gDetails.style.display = 'none';

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    gimage.setAttribute('src', profile.getImageUrl());
    gname.innerText = 'Name: ' + profile.getName();
    gmail.innerText = 'Email: ' + profile.getEmail();

    gimage.style.display = 'inline-block';
    gname.style.display = 'inline-block';
    gmail.style.display = 'inline-block';
    gso.style.display = 'inline-block';
    gDetails.style.display = 'inline-block';
    facebook.style.display = 'none';
    google.style.display = 'none';
    account.style.display = 'none';

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('You are signout successfully');
        gimage.style.display = 'none';
        gname.style.display = 'none';
        gmail.style.display = 'none';
        gso.style.display = 'none';
        gDetails.style.display = 'none';
        facebook.style.display = 'flex';
        google.style.display = 'flex';
        account.style.display = 'flex';

    });
}
