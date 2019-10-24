exports.handler = (event, context, callback) => {
    // Check if the user is signed in
    const claims = context.clientContext && context.clientContext.user;

    if(claims === undefined){
        callback(null, {
            statusCode: '401',
            body: JSON.stringify({msg: 'you need to sign in you friggen apple'})
        })
    }
    else{

        const user = context.clientContext.user;
        const userName = user.email.split('@')[0];

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({msg: 'welcome to your profile' +  userName})
        })

    }



}