const log = console.log
const error = console.error
const fs = require('fs')

module.exports = {
  readFile: function(file, split) {
    return new Promise((res, rej) => {
      fs.readFile(file, (e, d) => {
        e && rej(e)
        split ? res(d.toString().split('\n')) : res(d.toString())
      })
    })
  },
  writeFile: function(file, key, val, flag) {
    return new Promise((res, rej) => {
      const text = key ? '\n' + key + '=' + val + '\n' : val
      fs.writeFile(file, text, { flag }, e => {
        if (e) rej(e)
        res('Success Writing File')
      })
    })
  },
  getVar: function(array, key) {
    return new Promise(res => {
      let variable
      array.map(ln => {
        if (ln.includes(key + '=')) {
          variable = ln.slice(key.length + 1, ln.length)
        }
      })
      res(variable)
    })
  },
  replaceLine: function(arr, key, oldVal, newVal) {
    return new Promise(res => {
      let index = false
      arr.map((ln, i) => {
        if (ln.includes(key + '=' + oldVal)) {
          index = i
        }
      })
      if (typeof index === 'number') {
        arr[index] = key + '=' + newVal
        res(arr)
      } else {
        res(false)
      }
    })
  },
  readLine: function(file, key) {
    return new Promise((res, rej) => {
      this.readFile(file, true)
        .then(arr => this.getVar(arr, key))
        .then(variable => res(variable))
        .catch(rej)
    })
  },
}
