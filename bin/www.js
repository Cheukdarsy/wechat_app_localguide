/**
 * app启动文件
 */
const mongoose = require('mongoose');
const config = require('../config');

const app = require('../app');

// 链接数据库，启动app
(async () => {
  try {
    await mongoose.connect(config.mongoUri);
    await app.listen(config.port);
    console.log(`server start on port ${config.port}`);
  } catch (error) {
    console.log(error);
  }
})();
