const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUsername, getUserById) {
  const authUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (user == null) {
      console.log("No found");
      return done(null, false, { message: "No User Found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("Sucess");
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (e) {
      return done(null, false, { message: "Error Occourred! Try Again" });
    }
  };
  passport.use(new LocalStrategy(authUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
