import _debug from 'debug';
import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models';

const debug = _debug('app:server:auth');

passport.serializeUser((user, done) => {
  debug('Serialize user');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  debug('Deserialize user');
  let user = await User.findById(id);
  done(null, user);
});

passport.use(new LocalStrategy(async (username, password, done) => {
  let valid = false;
  let user = await User.findOne({
    where: { username: username },
    attributes: ['id', 'username', 'password']
  });
  debug('Auth user');

  if(user) {
    debug('Finded user');
    valid = await user.verifyPassword(password);
  }

  if(valid) {
    debug('Auth success');
    done(null, user);
  } else {
    debug('Auth fail');
    done(null, false);
  }
}));

export default passport;
