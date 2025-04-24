const User = require("../models/user.js");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random String';

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // console.log(jwt_payload);
    try {
        const user = await User.findOne({ email: jwt_payload.email }); 
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));