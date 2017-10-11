/*
 * @Author: darsy.cheuk 
 * @Date: 2017-10-10 18:14:37 
 * @Last Modified by: darsy.cheuk
 * @Last Modified time: 2017-10-11 10:06:28
 */

const mongoose = require('mongoose');
require('../model');

const WaiterModel = mongoose.model('Waiter');
const TouristModel = mongoose.model('Tourist');
class Tourist {
  /**
   * 标记小二
   * 
   * @static
   * @param {any} ctx 
   * @memberof Tourist
   */
  static async markWaiter(ctx) {
    try {
      const { id, waiterId } = ctx.request.body;
      const markResult = await TouristModel.findOneAndUpdate({ id },
        { $push: { waiterList: waiterId } }).exec();
      ctx.body = markResult;
    } catch (error) {
      ctx.body = error;
    }
  }
  /**
   * 根据位置进行搜索
   * 
   * @static
   * @param {any} ctx 
   * @memberof Tourist
   */
  static async searchWaiterByLocation(ctx) {
    try {
      const { location } = ctx.request.body;
      const searchResult = await WaiterModel.find({ serviceLocation: { $regex: location } }).select('waiterName occupation leisureTime').exec();
      ctx.body = searchResult;
    } catch (error) {
      ctx.body = error;
    }
  }

  /**
   * 根据id跟小二标记情况返回小二信息
   * 
   * @static
   * @param {any} id 
   * @param {any} sign 
   * @returns 
   * @memberof Tourist
   */
  static async getWaiterInfo(id, sign) {
    try {
      let condition = '-touristList ';
      if (!sign) condition += '-contact';
      const waiterInfo = await WaiterModel.find({ id }).select(condition).exec();
      return waiterInfo;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 显示标记的小二
   * 
   * @static
   * @param {any} ctx 
   * @memberof Tourist
   */
  static async showMarkedWaiters(ctx) {
    const asyncResultArray = [];
    try {
      const { id } = ctx.query;
      const waiterList = await TouristModel.find({ id }).select('waiterList').exec();
      waiterList.forEach((ele) => {
        asyncResultArray.push(Tourist.getWaiterInfo(ele.id, ele.signed));
      });
      const markWaiterInfo = await Promise.all(asyncResultArray);
      ctx.body = markWaiterInfo;
    } catch (error) {
      ctx.body = error;
    }
  }
}
module.exports = Tourist;
