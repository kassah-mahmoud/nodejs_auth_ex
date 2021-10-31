const { hash } = require("bcrypt");
const { User } = require("./database/models");

const salt = process.env.HASH_SALT || "$2b$10$I49D3ThlAFLZTFFFjtKyye";

async function hashPassword(pswd) {
  try {
    let hashedPswd = await hash(pswd, salt);
    return hashedPswd;
  } catch (err) {
    return "";
  }
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
