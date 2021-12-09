
const { ErrorModel } = require('../res-module/index')

module.exports = async (ctx, next) => {
    const session = ctx.session
    if (session && session.userInfo)
    {
        await next()
        return
    }
    ctx.body = new ErrorModel(10003, 'User not login yet')
}
