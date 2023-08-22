const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  user_id: { type:String, required: true },
  shop_name: { type: String, required: true },
  shop_owner: { type: String, required: true },
  shop_address: { type: String, required: true },
  shop_city: { type: String, required: true },
  shop_state: { type: String, required: true },
  shop_location_url: { type:String, required: true },
  shop_rat_id: { type: Number, required: true },
  shop_type: { type: String, required: true },
  shop_tags: { type: Array, required: true },
  shop_contect: { type: Number, required: true },
  shop_image: { type: String, required: true },
},{timestamps:true});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
