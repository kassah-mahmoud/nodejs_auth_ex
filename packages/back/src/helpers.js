const { hashSync } = require("bcrypt");
const { User } = require("./database/models");

const saltRounds = 10;

function hashPassword(pswd) {
  return hashSync(pswd, saltRounds);
}

async function getUser(id) {
  let user;
  try {
    user = await User.findByPk(id);
  } catch (err) {
    user = null;
  }
  return user;
}

module.exports = {
  hashPassword,
  getUser,
};
