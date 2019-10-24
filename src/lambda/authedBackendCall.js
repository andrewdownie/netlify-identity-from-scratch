exports.handler = (event, context, callback) => {
    // Check if the user is signed in
    const claims = context.clientContext && context.clientContext.user;

    const payload = {
        context: context,
        msg: 'claims is ' + claims
    }

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(payload)
    })

}