const bcrypt = require('bcrypt')

exports.genHash = (password) => {
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,10,function(err,hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    password:password,
                    hash:hash
                })
            }
        })
    })
}