const Order = require('../models/Order')
const Product = require('../models/Product')
const Address = require('../models/Address')

/**
 * 创建订单
 * @param {string} username 用户名
 * @param {Object} data 订单数据
 */

async function createOrder(username, data) {
    // console.log(username, data)
    // 解构 data（前端传来的订单信息）
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false,//默认值 false
        products = [] //默认值
    } = data

    // 根据 addressId 获取地址信息
    const address = await Address.findById(addressId)

    // 获取商品列表
    const pIds = products.map(p => p.id) // 格式如['商品1-id','商品2-id']
    const productList = await Product.find({
        shopId: shopId,
        // shopId:shopId,
        _id: { $in: pIds }
    })

    // 拼接上购买数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 通过商品 id 可以找到销售数量
        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0)
        {
            // 没有找到匹配的数量，报错
            throw new Error('未找到匹配的销量数据')
        }

        return {
            // mongoose v5.x版本按照如下方式书写
            // product: p,
            orderSales: filterProducts[0].num,  // 销量
            // mongoose v6.x版本按照如下方式书写
            product: {
                shopId: p.shopId,
                name: p.name,
                imgUrl: p.imgUrl,
                sales: p.sales,
                price: p.price,
                oldPrice: p.oldPrice
            }
        }
    })

    // 创建订单
    const newOrder = await Order.create({
        username,
        // mongoose v5.x版本按照如下方式书写
        // address,
        shopId,
        shopName,
        isCanceled,
        products: productListWithSales,
        // mongoose v6.x版本按照如下方式书写
        address: {
            username: address.username,
            city: address.city,
            department: address.department,
            houseNumber: address.houseNumber,
            name: address.name,
            phone: address.phone
        },
    })
    return newOrder
}

/**
 * 获取订单列表（作业）
 * @param {string} username 用户名
 */
async function getOrderList(username) {
    console.log('username', username)
    const list = await Order.find({ username }).sort({ _id: -1 })
    console.log('list', list)
    return list
}


module.exports = {
    createOrder,
    getOrderList
}
