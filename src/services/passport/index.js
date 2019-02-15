const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
// const BearerStrategy = require('passport-http-bearer').Strategy
// const OAuthStrategy = require('passport-oauth').OAuthStrategy
const JwtStrategy =  require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { Users  } = require('../../api/users/model')
const { screetKey } = require('../../config')
const brypt = require('bcrypt')
const saltRound = 10;

exports.password = () => (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) { 
          return res.status(401).jsonp({
            code: 401,
            message: "unauthorize"
          })
        }

        if (!user) {
          return res.status(401).jsonp({
            code: 401,
            message: 'username or password incoret'
          })
        }

        req.user = user
        next()

    })(req, res, next);
}

exports.google = () => (req, res, next) => {
  passport.authenticate('google', { scope: ["profile","email"] }, (err, user, info) => {
    if (err) { 
      return res.status(401).jsonp({
        code: 401,
        message: "unauthorize"
      })
    }

    req.user = user
    next()
  })
}

exports.token = () => (req, res, next) => {
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err){
      return res.status(401).jsonp({
        code: 401,
        message: 'unauthorize'
      })
    }

    if (!user){
      return res.status(401).jsonp({
        code: 401,
        message: 'unauthorize'
      })
    }

    req.user = user
    next()
  })(req, res, next);
}

passport.use('google', new GoogleStrategy({
    clientID: "1018161879504-mj69445rdvp3klvfuao6qtj6vb62e4rs.apps.googleusercontent.com",
    clientSecret: "FUm0ByrsQ-vLPytuW_PWL6yt",
    callbackURL: "/auth/google"
  }, (token, tokenSecret, profile, done) => {

     return done(null, profile)
      // User.findOrCreate({ googleId: profile.id }, (err, user) => {
      //   return done(err, user);
      // });
  }
));

passport.use(new LocalStrategy((username, password, done) => {
    Users.findOne({ where : { username: username } }).then(user => {
      if (!user) {
        return done(null, false, { message: "Incoret username" })
      }

      let validatePassword = brypt.compareSync(password, user.password)

      if (!validatePassword){
        return done(null, false, { message: "Incoret Password" })
      }

      return done(null, user)
    })
  }
));

passport.use('token', new JwtStrategy({
  secretOrKey: screetKey,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('access_token')
  ])
}, ({ id }, done) => {
  Users.findById(id).then(({ id, username, fullName, email , createdAt, updatedAt, picture }) => {
    user = { id, username, email, fullName, createdAt, updatedAt, picture }
    done(null, user)
      return user
    })
    .catch(done)
}))

exports.generateHash = (password) => {
  let salt = brypt.genSaltSync(saltRound, null);
  return brypt.hashSync(String(password), salt, null);
}