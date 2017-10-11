/**
 * 固定中间件
 */

const compose = require('koa-compose');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const options = {
  origin: '*'
};

const responseFormatter = (ctx) => {
  if (ctx.body) {
    if (ctx.body.errors || String(ctx.body.name).indexOf('Error') !== -1) {
      ctx.body = {
        code: -1,
        msg: ctx.body.name || 'error',
        reason: ctx.body.message
      };
    } else {
      ctx.body = {
        code: 0,
        msg: 'success',
        data: ctx.body
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'failed'
    };
  }
};

const urlFilter = pattern => async function filter(ctx, next) {
  const reg = new RegExp(pattern);
  try {
    await next();
  } catch (error) {
    throw error;
  }
  if (reg.test(ctx.originalUrl)) {
    responseFormatter(ctx);
  } else {
    ctx.body = {
      code: 1,
      msg: 'auth not allowed'
    };
  }
};

module.exports = () => compose([bodyParser(), convert(cors(options)), urlFilter('^api')]);
