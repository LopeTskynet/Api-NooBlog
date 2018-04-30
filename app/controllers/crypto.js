const bcrypt = require('bcrypt')

exports.hashPwd = (pwd) => {
    bcrypt.hash(pwd, 10, function(err, hash){
    return hash
})
}

exports.verifyPwd = (pwd, hash) => {
    bcrypt.compare(pwd, hash, function(err, res){
        if(res){
            return true
        }else{
            return false
        }
})
}
