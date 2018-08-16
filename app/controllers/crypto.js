const bcrypt = require('bcrypt')
const Promise = require("bluebird")

/**
 * function genHash : Generate a hash of the password using bcrypt
 *
 * @param {String} password
 * @return {String}
 */
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

/**
 * function compareHash
 *
 * @param {String} password password send by IHM
 * @param {String} hash hash password find in database
 * @param {boolean} success give a boolean for the return of this function
 * @return {boolean}
 */
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
