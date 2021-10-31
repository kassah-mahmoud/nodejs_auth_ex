const { hashSync } = require("bcrypt");

const saltRounds = 10;

function hashPassword(pswd) {
  hashSync(pswd, saltRounds);
}

module.exports = {
  hashPassword,
};
