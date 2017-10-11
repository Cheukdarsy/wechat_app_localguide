/**
 * 路由入口
 */
const Router = require('koa-router');
const Waiter = require('../controller/waiter.ctl');
const Tourist = require('../controller/tourist.ctl');

const router = new Router({
  prefix: '/api'
});

router.post('/markwaiter', Tourist.markWaiter)
  .post('/searchwaiter', Tourist.searchWaiterByLocation)
  .get('/showmarkedwaiter', Tourist.showMarkedWaiters)
  .post('/signtourist', Waiter.signTourist)
  .post('/showdynamics', Waiter.showDynamics)
  .post('/storewaiterinfo', Waiter.storeWaiterInfo);

module.exports = router;
