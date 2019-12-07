// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  var dbName = event.dbName;
  // 筛选条件。默认为空 格式{_id: 'dfdfd-dfdfd'}
  var filter = event.filter ? event.filter : {};
  var page = event.page ? event.page : 1;
  var pageSize = event.pageSize ? event.pageSize : 10;
  // 获取集合中的总记录数
  const countResult = await db.collection(dbName).where(filter).count()
  const total = countResult.total
  // 总页数
  const totalPage = Math.ceil(total / pageSize)
  var hasMore = true
  if (page > totalPage || page === totalPage) {
    hasMore = false
  }
  
  return db.collection(dbName).where(filter).skip((page - 1) * pageSize).limit(pageSize).orderBy('time', 'desc').get().then(res => {
    res.hasMore = hasMore
    return res
  })
}