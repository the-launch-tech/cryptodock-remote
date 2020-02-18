export default async function(string, binding, type) {
  try {
    const data = await global.Conn.asyncQuery(string, binding)

    if (type === 'single') {
      return data ? data[0] : null
    } else if (type === 'save') {
      return data ? data.insertId : null
    } else if (typeof type === 'function') {
      return this.type(data)
    } else {
      return data
    }
  } catch (err) {
    throw err
  }
}
