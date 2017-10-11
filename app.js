//   _-~~~-_       _-~~~-_
// /~       ~\    :    ,  \
// '           ~   ,   |:  :
// {      /~~\  :--~""""\.:  :
// \    (... :   /^\  /^\ ;
// ~\_____     |   | | |:~
//       /     |__O|_|O|;
//      (     /       O \
//       \   ( `\_______/)
//        `\  \         /
//          )  ~-------~'\
//         /              \
//        :               ||
//        |  |            ||
//        |  |.======[]==+'|
//       (~~~~)       |   |~)
//       /    \       |   | \
// ~\          \___/)______/^\__|_/
// `\      //    |  |      | |
// `\__//'     |  |      | |
//  ~~       (~~~~)    (~~~)
//          /     =\..'    =_
//         |__________)________)

const Koa = require('koa');
const middleware = require('./middleware');
const router = require('./router');

const app = new Koa();
app.use(middleware());
app.use(async (ctx, next) => {
  const startTime = Date.now();
  let milestamp;
  try {
    await next();
    milestamp = Date.now() - startTime;
    console.log(milestamp);
  } catch (error) {
    milestamp = Date.now() - startTime;
    console.log(milestamp);
  }
});

app.use(router.routes(), router.allowedMethods());

module.exports = app;

