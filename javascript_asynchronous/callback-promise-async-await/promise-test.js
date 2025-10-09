const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length + 1;
    DB.push(user);
    console.log(`save ${user.name} to DB`);

    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user);
        } else {
            reject(new Error(`save ${user.name} to DB fail`));
        }
    })
}

function sendEmail(user) {
    console.log(`send email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    })
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`success register ${user.name}`);
    })
}

function registerByPromise(user) {
    const result = saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error)).finally(() => console.log('finally!'));
    console.log(result);
    return result;
}

const myUser = { name: 'test', email: 'test@me.com', password: '1234' };
const result = registerByPromise(myUser);
// result.then(console.log);

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log); 
