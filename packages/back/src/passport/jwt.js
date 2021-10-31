const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { getUser } = require("../helpers");

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
  jsonWebTokenOptions: {
    expiresIn: "7d",
  },
};

const JWTStrategy = new passportJWT.Strategy(
  jwtOptions,
  async (payload, next) => {
    const user = (await getUser(payload.id)) || false;

    next(null, user);
  }
);

passport.use(JWTStrategy);

function generateToken(user) {
  return jwt.sign(user, jwtOptions.secretOrKey);
}

module.exports = { passport, generateToken };
