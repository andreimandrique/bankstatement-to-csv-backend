import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";

dotenv.config();

const configurePassportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
};

export default configurePassportGoogle;
