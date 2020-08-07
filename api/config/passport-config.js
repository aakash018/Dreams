const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUsername, getUserById, messages) {
  const authUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (user == null) {
      messages("No User Found");
      return done(null, false);
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        messages("Welcome");
        return done(null, user);
      } else {
        messages("Password Incorrect");
        return done(null, false);
      }
    } catch (e) {
      messages("Error Occoured! Try Again...");
      return done(null, false);
    }
  };
  passport.use(new LocalStrategy(authUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
