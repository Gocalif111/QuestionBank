const passport = require("passport");

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = requireAuth;
