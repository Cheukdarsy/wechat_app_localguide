/**
 * 基础配置
 */

const mongoconfig = {
  user: 'das',
  pwd: 'das',
  dburl: '127.0.0.1',
  db: 'wechatapp',
  port: '27017'
};
module.exports = {
  port: 3001,
  mongoUri: `mongodb://${mongoconfig.user}:${mongoconfig.pwd}@${mongoconfig.dburl}:${mongoconfig.port}/${mongoconfig.db}`
};
