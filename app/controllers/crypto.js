const bcrypt = require('bcrypt')
const Promise = require("bluebird")

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

exports.compareHash = (password, hash, success) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, hash, function(err, res){
            if(res) {
                console.log('match')
                success(true)
            } else {
                console.log('dont match')
                success(false)
            }
        })
    })
}