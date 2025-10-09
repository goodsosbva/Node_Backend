async function myName() {
    return "Andy";
}

async function showName() {
    const name = await myName();
    console.log(name);
}

// console.log(showName());

function waitOneSecond(msg) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve(`${msg}`)
        }, 1000);
    })
}

async function countOneToTen() {
    for (let x of [...Array(10).keys()]) {
        const msg = await waitOneSecond(`${x + 1}초 대기중....`);
        console.log(msg);
    }

    console.log("완료!");
}

countOneToTen();