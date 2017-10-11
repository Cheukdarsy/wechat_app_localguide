/*
 * @Author: darsy.cheuk 
 * @Date: 2017-10-10 15:25:57 
 * @Last Modified by: darsy.cheuk
 * @Last Modified time: 2017-10-10 16:47:33
 * @introduce: model schema for waiters
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const waiterSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  waiterName: String,
  serviceLocation: String,
  occupation: String,
  leisureTime: String,
  selfDescription: String,
  contact: String,
  touristList: [{ id: { type: Schema.Types.ObjectId, ref: 'Waiter' },
    signed: { type: Schema.Types.Boolean, default: false },
    updateTime: { type: Schema.Types.Date, default: Date.now } }]
});

module.exports = mongoose.model('Waiter', waiterSchema);
