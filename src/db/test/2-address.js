

const { Address } = require('../../models/index')

!(async() => {
    // // 创建
    // const a1 = new Address({
    //     username: 'zhangsan',
    //     city: '北京',
    //     department: '西二旗小区',
    //     houseNumber: '2号楼1单元403',
    //     name: '双越老师',
    //     phone: '18677778888',
    // })
    // a1.save() // 保存到数据库

    // // 创建
    // const a2 = new Address({
    //     username: 'zhangsan',
    //     city: '北京',
    //     department: '软件园二期',
    //     houseNumber: '百度科技园',
    //     name: '双越老师',
    //     phone: '18677778888',
    // })
    // a2.save() // 保存到数据库

    // // 获取地址列表，**按照更新时间逆序**
    // const addressList = await Address.find().sort({ updatedAt: -1 }) // 按更新时间倒序
    // console.log('address list', addressList)

    // 获取单个地址，根据 id 获取（以下两种写法都可以）
    // const address = await Address.findOne({ _id: '5ef05481e6f8ed3a3bb59880' })
    const address = await Address.findById('5ef05481e6f8ed3a3bb59881')
    console.log('address', address)

})()
