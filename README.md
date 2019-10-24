# Work
# In
# Progress
# Netlify-Identity-From-Scratch
WARNING this tutorial is using yarn. Big oof.
NOTE: This tutorial uses https://github.com/andrewdownie/create-react-app-lambda-from-scratch as a starting point.

This tutorial REQUIRES that you have a netlify repo with Netlify-Identity enabled on it. Enabling identity on a Netlify repo is as simple as browing through the settings until you find the Identity tab, and clicking 'enable'.

Unfortunately, I'm not aware how to get this fully working locally yet, so the site needs to be deployed to Netlify every time to fully test it.

## Step 1)
### After you've cloned https://github.com/andrewdownie/create-react-app-lambda-from-scratch, enter the folder, and then run the yarn command on the command line to install the dependencies:
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
```javascript
import netlifyIdentity from 'netlify-identity-widget';
window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();
```
## Step 4)
### Modify App.js, so that if the user isn't signed in, the Netlify Identity Widget will be shown
```javascript
```
## Step 5)
### Modify App.js to send the users sign in token to a backend request when they click a button
```javascript
```
## Step 6)
### Create the lambda that detects if the user is signed in, and responds accordingly
```javascript
exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: 'this is test.js'
    });
}
```
## Step 7)
### Test your app for compile time errors by running the following command. You will need the netlify-cli package globally installed for this to work.
```
ntl dev -p 9000
```
## Step 8)
### Push to git, and deploy your site to Netlify, and go to the url it's hosted at
### The login window should appear if you're not signed in
### If don't sign in and click the button, a message should say that you're not signed in, you can refresh the page to make the sign in widget pop up again.
### If you're signed in, you should get a message saying that you're signed in, along with the email associated to the sign in
### To sign out, you have to manually clear the local storage for the site.