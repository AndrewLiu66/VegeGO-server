
// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
require('dotenv').config()
// const uri = "mongodb+srv://andrew:Andrew1998,.@cluster0.oifpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

// async function main() {
//     const uri = "mongodb+srv://andrew:<password>@cluster0.oifpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//     // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//     try
//     {
//         await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     } catch (e)
//     {
//         console.error(e)
//     } finally
//     {
//         await mongoose.close();
//     }
// }
// main().catch(console.error)
// connect locally
const url = 'mongodb://localhost:27017'
const password = 'andrew1998'
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// 开始连接
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// // 连接对象
const db = mongoose.connection

// db.on('error', err => {
//     console.error('mongoose connect error', err)
// })
// db.once('open', () => {
//     // 用以测试数据库连接是否成功
//     console.log('mongoose connect success')
// })

/**
 * 注意：
 * 1. 此处一直保持连接状态即可，不用关闭
 * 2. 即 nodejs 和 mongodb 一直保持连接状态，而不是每次操作数据都重新连接，后者会耗费性能
 * 3. 虽然连接是异步的，但是不用等到连接成功再进行数据操作。mongoose 会帮你缓存这些操作，待连接成功之后再执行。
 */

module.exports = mongoose
