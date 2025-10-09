const DB = [];

function register(user) {
    return saveDB(user, function (user) {
        return sendEmail(user, function(user) {
            return getResult(user);
        })
    })
}

function saveDB(user, callback) {
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

function sendEmail(user, callback) {
    console.log(`send email to ${user.email}`);
    return callback(user);
}

function getResult(user) {
    console.log(`success register ${user.name}`);
}   

const result = register({ name: 'test', email: 'test@me.com', password: '1234' });
console.log(result);