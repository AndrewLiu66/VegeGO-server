const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../res-module/index')
const loginCheck = require('../middleware/loginCheck')
const {
    createAddress,
    getAddressList,
    getAddressById,
    updateAddress
} = require('../controller/address')

router.prefix('/api/user/address')

// 创建收货地址
router.post('/', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body || {} // 前端传来的数据

    // 创建数据
    try
    {
        const newAddress = await createAddress(username, data)
        ctx.body = new SuccessModel(newAddress)
    } catch (ex)
    {
        console.error(ex)
        // 返回失败
        ctx.body = new ErrorModel(10004, `创建地址失败`)
    }

})

// 获取收货地址列表
router.get('/', loginCheck, async function (ctx, next) {
    // 有登录验证，可以直接获取 session
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    // 获取列表
    const list = await getAddressList(username)

    ctx.body = new SuccessModel(list)
})

// 获取单个收货地址
router.get('/:id', loginCheck, async function (ctx, next) {
    const id = ctx.params.id // 获取路由的动态参数
    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
})

// 更新收货地址
router.patch('/:id', loginCheck, async function (ctx, next) {
    const id = ctx.params.id // 获取路由的动态参数
    const data = ctx.request.body || {} // 前端传来的数据
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    // 更新
    const newAddress = await updateAddress(id, username, data)
    ctx.body = new SuccessModel(newAddress)
})
module.exports = router
