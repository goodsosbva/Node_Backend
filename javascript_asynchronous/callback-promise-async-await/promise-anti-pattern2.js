function myWork(work) {
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase());
    })
}

function playGame(work) {
    return new Promise((resolve, reject) => {
        if (work === "DONE") {
            resolve("GO PLAY GAME");
        } else {
            reject(new Error("NOT DONE"));
        }
    })
}

myWork('done')
    .then(playGame)
    .then(console.log)