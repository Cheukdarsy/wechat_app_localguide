/*
 * @Author: darsy.cheuk 
 * @Date: 2017-10-10 18:14:51 
 * @Last Modified by: darsy.cheuk
 * @Last Modified time: 2017-10-11 10:12:14
 * @introduce: 我是小二逻辑入口
 */

const mongoose = require('mongoose');
require('../model');

const WaiterModel = mongoose.model('Waiter');
const TouristModel = mongoose.model('Tourist');
class Waiter {
  /**
   * 获取游客名字
   * 
   * @static
   * @param {any} id 
   * @returns 
   * @memberof Waiter
   */
  static async getTouristname(id) {
    try {
      const touristName = await TouristModel.findById(id).select('touristName').exec();
      return touristName;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 标记旅客
   * 
   * @static
   * @param {any} ctx 
   * @memberof Waiter
   */
  static async signTourist(ctx) {
    try {
      const { id, touristId } = ctx.request.body;
      const updateSignResult = await WaiterModel.findOneAndUpdate({ id, 'touristList.id': touristId },
        { 'touristList.signed': true }).exec();
      const updateTourist = await TouristModel.findOneAndUpdate({ id: touristId, 'waiterList.id': id },
        { signed: true });
      ctx.body = updateSignResult && updateTourist;
    } catch (error) {
      ctx.body = error;
    }
  }
  /**
   * 获取动态()
   * 
   * @static
   * @param {any} ctx 
   * @memberof Waiter
   */
  static async showDynamics(ctx) {
    try {
      const { id, limit } = ctx.request.body;
      const showDynamicsResult = await WaiterModel.find({ id }).select('touristList').exec();
      const limitDynamicResult = showDynamicsResult.slice(0, limit);
      limitDynamicResult.map(ele => Waiter.getTouristname(ele.id));
      ctx.body = await Promise.all(limitDynamicResult);
    } catch (error) {
      ctx.body = error;
    }
  }
  /**
   * 
   * 获取用户信息，存储
   * @static
   * @param {any} ctx 
   * @memberof Waiter
   */
  static async storeWaiterInfo(ctx) {
    try {
      const storeResult = await WaiterModel.create(ctx.request.body).exec();
      ctx.body = storeResult;
    } catch (error) {
      ctx.body = error;
    }
  }
}

module.exports = Waiter;
