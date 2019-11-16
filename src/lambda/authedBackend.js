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