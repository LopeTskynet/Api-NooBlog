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

exports.compareHash = (password, hash) => {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, hash, function(err, res){
            if(res) {
                console.log('match')
                return true
            } else {
                console.log('dont match')
                return false
            }
        })
    })
}