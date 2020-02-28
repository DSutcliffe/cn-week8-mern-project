const session = require('../models/session')

function getSessions(passedInUserID) {
    return new Promise((resolve, reject) => {
        // Query database using session shecma
        session.find({}, (err, docs) => {
            for (const session of docs) {
                if (JSON.parse(session.session).userID == passedInUserID) {
                    resolve(true);
                    // return; // return = get out of function, break = get out of loop
                }
            }
            resolve(false);
            // return;
        })
    })
}

module.exports = getSessions;