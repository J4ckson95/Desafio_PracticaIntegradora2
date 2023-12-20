import passport from "passport";
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy
const cookieStractor = (req) => {
    const token = (req?.cookies) ? req.cookies["authToken"] : null
    return token
}
const initializedPassport = () => {
    passport.serializeUser("jwt", new JWTStrategy(
        { secretOrKey: "C0D3RH0US3", jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieStractor]) },
        (jwt_payload, done) => { return done(null, jwt_payload) }
    ))
}
export default initializedPassport