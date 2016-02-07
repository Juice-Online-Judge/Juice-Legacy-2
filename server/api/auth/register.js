import _debug from 'debug';
import validate from 'validate.js';
import when from 'when';
import User from '../../../models/user';
import router from './router';
import rule from '../../../src/validation/register';

const debug = _debug('app:server:route:register');
const NOT_UNIQ_MSG = 'Username not unique';

let checkUnique = (username) => {
  return User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user !== null) {
      throw new Error(NOT_UNIQ_MSG);
    }
  });
}

router.post('/register', async (ctx, next) => {
  let body = ctx.request.body;
  debug(body);
  if (body.username) {
    try {
      await when.all([checkUnique(body.username), validate.async(body, rule)])
      debug('Pass validation');
      ctx.status = 200;
      ctx.body = {
        success: true
      }
    } catch (error) {
      if (error instanceof Error) {
        if(error.message === NOT_UNIQ_MSG) {
          debug(NOT_UNIQ_MSG);
          ctx.status = 409;
          ctx.body = {
            success: false,
            message: {
              username: NOT_UNIQ_MSG
            }
          };
        } else {
          debug('error occur');
          debug(error);
          ctx.status = 500;
        }
      } else {
        ctx.status = 422;
        ctx.body = {
          success: false,
          message: error
        };
      }
    }
  } else {
    ctx.status = 422;
    ctx.body = {
      success: false,
      message: 'Username can\'t be blank'
    };
  }
});
