const { __esModule } = require("ethers/providers/base-provider")

function logCall(func) {
  func().then(re => {
    console.log('result:', re)
  }).catch(err => {
    console.error(err)
  })
}

module.exports = {
  logCall,
} 