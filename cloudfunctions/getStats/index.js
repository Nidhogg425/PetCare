const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async () => {
  const db = cloud.database()
  const res = await db.collection('stats').doc('global').get()
  return { total: res.data.serviceCount }
}