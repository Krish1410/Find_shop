const express  = require('express')
const Shop = require('../models/shop')



const router = express.Router()

router.get('/',async (req,res)=>{
    var data = await Shop.find()
    console.log(data);
    res.send(data)
})
router.post('/create',async (req,res)=>{
    try {
        const newShop = new Shop(req.body);
        await newShop.save();
        res.status(201).json(newShop);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    // console.log(data);
    // res.send(data)
})    
router.get('/find',async(req,res)=>{
  let {shopName,shopState,shopOwner,shopCity,shopType,shopTags}= req.query
  console.log(`
    ShopName : ${shopName}\n
    shopState : ${shopState}\n
    shopCity : ${shopCity}\n
    shopOwner : ${shopOwner}\n
    shopType : ${shopType}\n
    shopTags : ${shopTags}\n
  `)
  let shops = (await Shop.find()).filter(shop => {
    return (
      (!shopName || (shop.shop_name && shop.shop_name.toLowerCase().includes(shopName.toLowerCase()))) &&
      (!shopState || (shop.shop_state && shop.shop_state.toLowerCase().includes(shopState.toLowerCase())))&&
      (!shopOwner || (shop.shop_owner && shop.shop_owner.toLowerCase().includes(shopOwner.toLowerCase())))&&
      (!shopCity || (shop.shop_city && shop.shop_city.toLowerCase().includes(shopCity.toLowerCase())))&&
      (!shopType || (shop.shop_type && shop.shop_type.toLowerCase().includes(shopType.toLowerCase())))
    )
  })

  if(shopTags){

    let filtered = []
    shops.map((value)=>{
      value.shop_tags.map((tag)=>{
        if (tag.toLowerCase() == shopTags.toLowerCase()){
          filtered.push(value)
        }
      })
    })
    console.log(filtered);
    return res.json(filtered)

  }

  return res.json(shops)

})

module.exports = router