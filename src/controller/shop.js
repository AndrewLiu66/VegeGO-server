
const { Shop, Product } = require('../models/index')

// 热门商店列表（目前没有判断是否热门的规则，就先以默认排序代替了）
async function getHotList() {
    const list = await Shop.find().sort({ _id: -1 }) // 逆序
    return list
}

// 根据 id 获取单个商店信息
async function getShopInfo(id) {
    const shop = await Shop.findById(id)
    return shop
}

// 根据商店 id 获取商品
async function getProductsByShopId(id, tab = '') {
    const pList = await Product.find({
        shopId: id,
        tabs: {
            $in: tab // 匹配 tabs: 用户只能点一个tab，然后把所有含有此tab的商品返回出来
        }
    }).sort({ _id: -1 }) // 逆序
    return pList
}

module.exports = {
    getHotList,
    getShopInfo,
    getProductsByShopId
}
