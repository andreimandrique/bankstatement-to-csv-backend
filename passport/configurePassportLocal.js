import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const configurePassportLocal = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = { id: 1, username: "admin", password: "123" };

      return done(null, user);
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (user_id, done) => {
    const user = { id: 1, username: "admin", password: "123" };

    done(null, user);
  });
};

export default configurePassportLocal;
