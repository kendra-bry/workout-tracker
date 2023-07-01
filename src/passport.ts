import passport from 'passport';
import { Strategy } from 'passport-github';
import User, { IUser } from './models/User';

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    },
    // function (accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //   });
    // }
    async (accessToken, refreshToken, profile, done) => {
      console.log({ profile });
      // const newUser = {
      //   githubId: profile
      // }
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: Express.User) => {
    done(err, user);
  });
});
