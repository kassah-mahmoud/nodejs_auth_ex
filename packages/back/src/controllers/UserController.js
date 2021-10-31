const { User } = require("../database/models");
const { hashPassword } = require("../helpers");
const { generateToken } = require("../passport/jwt");
const { compare } = require("bcrypt");

class UserController {
  static async register(req, res) {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
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

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res
          .status(400)
          .json({ message: "Email doesn't belong to any account" });

      try {
        const match = await compare(password, user.password);
        if (!match) {
          return res.status(400).json({ message: "Incorrect password" });
        }
      } catch (err) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = generateToken({ id: user.id });

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = UserController;
