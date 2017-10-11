/*
 * @Author: darsy.cheuk 
 * @Date: 2017-10-10 11:00:06 
 * @Last Modified by: darsy.cheuk
 * @Last Modified time: 2017-10-10 16:10:49
 * @introduce: model schema for tourist
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const touristSchema = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  touristName: String,
  waiterList: [{ id: { type: Schema.Types.ObjectId, ref: 'Waiter' },
    signed: { type: Schema.Types.Boolean, default: false } }]
});

module.exports = mongoose.model('Tourist', touristSchema);
