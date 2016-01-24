import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

passport.use(new LocalStrategy(async (username, password, done) => {
  let valid = false;
  let user = await User.findOne({
    where: { username: username },
    attributes: ['id', 'username', 'password']
  });

  if(user) {
    valid = await user.verifyPassword(password);
  }

  if(valid) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

export default passport;
