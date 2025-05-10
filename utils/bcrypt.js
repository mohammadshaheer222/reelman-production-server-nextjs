const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, salt) => {
            if (error) {
                reject(error);
            }
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) {
                    reject(error);
                }
                console.log(hash, "jd")
                resolve(hash);
            });
        });
    });
};

const comparePassword = async (password, hashed) => {
    console.log(password, "pas")
    console.log(hashed, "hashed")
    return await bcrypt.compare(password, hashed);
};

module.exports = { hashPassword, comparePassword };
