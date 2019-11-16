# Work
# In
# Progress
# Netlify-Identity-From-Scratch
WARNING this tutorial is using yarn. Big oof.  
NOTE: This tutorial uses https://github.com/andrewdownie/create-react-app-lambda-from-scratch as a starting point.


There are two main limitations when working with netlify identity locally. You MUST have a netlify site with identity setup, and you can ONLY use the email method of logging in. Identity providers (Google, GitHub, ect...) will result in being redirected to your hosted netlify site after being logged  in.

This tutorial REQUIRES that you have a netlify repo with Netlify-Identity enabled on it. Enabling identity on a Netlify repo is as simple as browing through the settings until you find the Identity tab, and clicking 'enable'.

## Presetup)
### This tutorial does not cover working with git or the netlify web ui, but here's a high level overview:
You need to create an account at netlify.com You will also need need an account with a compatible git provider Netlify supports GitHub, GitLab, and BitBucket as git repo sources.

Setup a new git repo on your selected compatiable git provider. On netlify.com, create a "New site from Git", and choose the new git repo you just created as the source.

Go to the settings portion of the new site you just created on Netlify, and enable Identity. This will allow the Netlify-Identity-Widget to let users sign in.

Every time you push to your git repo, Netlify will automatically detect this, do a rebuild and then a redeploy.

## Step 1)
### After you've cloned https://github.com/andrewdownie/create-react-app-lambda-from-scratch, move the contents of this repo to the repo you created in the presetup.
### Enter your repo folder, and then run the yarn command on the command line to install the dependencies:
```bash
yarn
```
## Step 2)
### Install the Netlify Identity Widget
```bash
yarn add netlify-identity-widget
```
## Step 3)
### Hook up the Netlify Identity widget up to the browser window, and then init the Netlify Identity widget
Add this below the existing imports in src/index.js
```javascript
import netlifyIdentity from 'netlify-identity-widget';
window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();
```
## Step 4)
### import the netlify identity widget in src/App.js
```javascript
import netlifyIdentity from 'netlify-identity-widget';
```

## Step 5)
### In the return portion of the App function, add two buttons. One button to open the netlify identity widget, and a second button to make a back end call to an endpoint that will check for authentication
```javascript
...
  return (
    <div className="App">
      <button onClick={backendAuthedCall}>Back end authed call</button> // this line is new
      <button onClick={() => netlifyIdentity.open()}>Identity Widget</button> // this line is new
...
```

To sign in and out, click on the netlify identity widget button.  
The Back end authed call button won't work until step 6 is completed.

## Step 6)
### Modify App.js to send the users sign in token to a backend request when they click a button
Add the following in the App function, but before the return:
```javascript
  // If the user is signed in, this will pull their token, and pass it as part of the headers
  function generateHeaders() {
    const headers = {'content-type': 'application/json'};

    const user = netlifyIdentity.currentUser();

    if (user) {
      return user.jwt()
      .then(token => {
        return {...headers, Authorization: `Bearer ${token}`}
      })
    }

    return Promise.resolve(headers);
  }
  
  // This makes the call to the back end function
  function backendAuthedCall() {
    console.log('back end call');

    generateHeaders().then(headers => {
      fetch('/.netlify/functions/authedCall',{
        method: 'POST',
        headers
      })
      .then(raw => raw.json())
      .then(json => console.log(json))
    })
  }
```

## Step 7)
### Create the lambda that detects if the user is signed in, and responds accordingly
Netlify does some magic for us, if the authorization header is present on the request from the client side (as we've setup above), then the context object server side will be filled with some user info for us.

We are going to check if the user info is present. If not, then the user is not signed in, and the request will return 401 unauthorized. But if the user is signed in, we return a message saying they are signed in, along with their email address they are signed in with.

Create a file src/lambda/authedCall.js and fill it with the following:
```javascript
exports.handler = (event, context, callback) => {
    const user = context.clientContext.user;

    if (user) {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({msg: `welcome user ${user.email}`})
        });

        return;
    }

    callback(null, {
        statusCode: 401,
        body: JSON.stringify({msg: 'you need to sign in silly'})
    });

}
```
## Step 8)
### Test your app for compile time errors by running the following command. You will need the netlify-cli package globally installed for this to work.
```
ntl dev -p 9000
```
## Step 9)
### Push to git, and deploy your site to Netlify, and go to the url it's hosted at
### The login window should appear if you're not signed in
### If don't sign in and click the button, a message should say that you're not signed in, you can refresh the page to make the sign in widget pop up again.
### If you're signed in, you should get a message saying that you're signed in, along with the email associated to the sign in
### To sign out, you have to manually clear the local storage for the site.