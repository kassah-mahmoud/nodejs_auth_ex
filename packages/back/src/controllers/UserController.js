const { User } = require("../database/models");
const { hashPassword } = require("../helpers");
const { generateToken } = require("../passport/jwt");

class UserController {
  static async register(req, res) {
    const { name, email, password } = req.body;

    console.log(password);
    try {
      const user = await User.create({
        name,
        email,
        password: hashPassword(password),
      });

      const token = generateToken({ id: user.id });

      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = UserController;
