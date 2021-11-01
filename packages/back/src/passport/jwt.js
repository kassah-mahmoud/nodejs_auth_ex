const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { User } = require("../database/models");

const jwtOptions = {};

jwtOptions.jwtFromRequest =
  passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = process.env.TOKEN_SECRET;
jwtOptions.jsonWebTokenOptions = {
  expiresIn: "30d",
};

const JWTStrategy = new passportJWT.Strategy(
  jwtOptions,
  async (payload, next) => {
    try {
      const user = await User.findByPk(payload.id);
      if (!user) {
        return next(null, false);
      }
      delete user.password;
      return next(null, {
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      return next(err);
    }
  }
);

passport.use(JWTStrategy);

function generateToken(user) {
  return jwt.sign(user, jwtOptions.secretOrKey);
}

module.exports = { passport, generateToken };
