const es = require('ethers')

const {RPC} = require('../src/provider')
const {lurl, purl, acts, CAddr, CABI} = require('./mock')
const { Signer } = require('ethers')

let pro = RPC(lurl)

let sig = pro.getSigner(0)

// console.log('Signer: ', pro, sig)

console.log('provider of signer:', sig.provider)

sig.getAddress().then(re => {
  console.log('signer address: ', re)
})

sig.getBalance().then(re => {
  console.log('get signer balance:', re, re.toString())
})

sig.unlock().then(re => {
  console.log('unlock result:', re)
})

console.log(es.Signer.isSigner(sig))

let ethTx = {
  to: acts[1],
  value: es.utils.parseEther('0.1')
}

sig.sendTransaction(ethTx).then(re => {
  console.log('send eth transaction result: ', re)
  pro.waitForTransaction(re.hash).then(re => {
    console.log('wait for transaction result: ', re)
  })
})

let tokTx = {
  to: CAddr,
  data: ''
}

sig.popu