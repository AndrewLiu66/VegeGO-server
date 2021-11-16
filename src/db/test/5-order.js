/**
 * @description 订单数据测试
 * @author 双越老师
 */

const { Address, Order, Product } = require('../../models/index')

!(async () => {
    // 模拟一个订单的创建过程

    const username = 'zhangsan'

    // 根据 addressId 获取地址信息
    const address = await Address.findById('5ef05481e6f8ed3a3bb59881')

    // 商店信息
    const shopId = '5ef05834f187fc3bbd81f4df'
    const shopName = '沃尔玛'

    // 订单的商品 id 和数量
    const products = [
        {
            id: '5ef0823a9e1a1f4bd32e5311',
            num: 6
        },
        {
            id: '5ef0823a9e1a1f4bd32e5312',
            num: 3
        }
    ]

    // 获取商品列表
    const pIds = products.map(p => p.id)
    // 找出与上面两个id对应的商品，放在productList里面
    const productList = await Product.find({
        // 条件1：商品 id
        _id: {
            $in: pIds
        },
        // 条件2：商店 id
        shopId,
    })

    // 给商品列表增加数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 找到商品销量，从商品库里面找到的商品顺序可能跟products里面的商品顺序不太一样，
        // 因此这里的 item.id === id 就是找到匹配的商品再返回数组
        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            // 没有找到匹配的数量，报错
            throw new Error('未找到匹配的销量数据')
        }

        return {
            orderSales: filterProducts[0].num, // 销量
            product: p
        }
    })

    // // 创建订单
    // await Order.create({
    //     username,
    //     address,
    //     shopId,
    //     shopName,
    //     isCanceled: false, // 是否被取消，依赖于前端的传入
    //     products: productListWithSales
    // })

    // // 获取订单列表
    // const orderList = await Order.find().sort({ _id: -1 }) // 逆序
    // console.log('order list', orderList)
    // console.log('order product 0', orderList[0].products[0])

})()
