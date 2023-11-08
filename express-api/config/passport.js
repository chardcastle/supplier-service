import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from "../user/user.model.js"

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default passport => {
    passport.use(new Strategy(opts, function(jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub })
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(error => {
                return done(error, false);
            });
    }));
};
