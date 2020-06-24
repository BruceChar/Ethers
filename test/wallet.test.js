const ethers = require('ethers')
const Wallet = require('../src/wallet')


let pkey = '36a224377febe6f8124f8361086966670148bd88804a3195eafea66ffa359074'
let pkey1 = 'aa24e700e416b181fe2f6be304c208a6037e297f749bbb6e16ed353a89c6b5c7'
let provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')

let from = '0x6ebceF5d28698F1B7CF472452Eb2d53875AFa79A'
let toAddr = '0xBbBa69C09B11d51bf772df8ea0D262717Cb98519'
let addr1 = '0x7E1ff8c150101C38507383b19662F5559e987959'
let addr2 = '0x82DC3659dB03cDE8a5b626a6f6e4d980c1AA06c5'
let deleAddr = '0x782e508C9c86B6a9Ec44D283FF61c8eE1Ddd10b0'

Wallet.setProvider(provider)

/**
 * 
 * @param {*} wallet 
 * @param {*} pwd 
 */

function encryptWallet(wallet, pwd) {
  let json = wallet.encrypt(pwd, p => {
    // console.log('process: %s %', p * 100)
  }).then(re => {
    console.log('encrypt result: ', re)
  })
}




/*************************连接provider的wallet账户***************************************/
// 连接provider
let wal = Wallet.fromPrivateKey(pkey, provider)
let wal1 = Wallet.fromPrivateKey(pkey1, provider)

// wal.getBalance().then(re => {
//   /**
//    * 获取钱包ether，结果是一个BigNumber
//    */
//   console.log('balance :', re, re.toHexString(), re.toString())
// })

// wal.getTransactionCount().then(re => {
//   /**
//    * 获取当前的交易数量，作为下次发送交易的nonce，返回数字
//    * @Note 如果要批量发送，需在本地做nonce管理
//    */
//   console.log('transaction count:', re)
// })

// provider.estimateGas({
//   to: toAddr,
//   value: ethers.utils.parseEther('1000')
// }).then(re => {
//   console.log('-------gas limit----------:', re)
// })

let acts = [
  '0xBbBa69C09B11d51bf772df8ea0D262717Cb98519',
  '0x6ebceF5d28698F1B7CF472452Eb2d53875AFa79A',
  '0x7E1ff8c150101C38507383b19662F5559e987959',
  '0x82DC3659dB03cDE8a5b626a6f6e4d980c1AA06c5',
  '0x782e508C9c86B6a9Ec44D283FF61c8eE1Ddd10b0',
  '0xb40046F127A5aCB11D2E565660576e469a0390a8',
  '0x3F2dd3f924d6f6Be0B55337d1C4758119dD416ac',
  '0x354da21c7E03062D80945129A7abBC73d6343FBE',
  '0x509f49f483fc1BDde868A2171c89B1596753C42C',
  '0x3283D5595E17d63bd70e5bb643526b1Dd721205D'
]


let signedHaSH = ''

let signer = provider.getSigner(1)
// console.log('signer 1: ', signer)

// signer.sendTransaction({
//   to: acts[0],
//   value: ethers.utils.parseEther('1'),
//   // gasPrice: '0x06fc23ac00',
//   // gasLimit: '0x5208'
// }).then(re => {
//   console.log('Send transaction: ', re)
// })

console.log('module--:', module)

let tx = {}
wal.getTransactionCount().then(re => {
  console.log('nonce:', re)
  tx = {
    to: acts[2],
    value: '0x0de0b6b3a7640000',
    gasPrice: '0',//'0x06fc23ac00',
    gasLimit: '0', //'0x5208',
    nonce: re
  }
  // let rawt = ethers.utils.keccak256(tx)
  wal.sign(tx).then(re => {
    console.log('wallet sign result: ', re)
    signer.sendTransaction()
    provider.send('eth_sendRawTransaction', re).then(re => {
      console.log('send raw: ', re)
    }).catch(err => {
      console.error(err)
    })
  })
})


// let stx = ethers.utils.serializeTransaction
// console.log('stx: ', stx)
let signed = ''
// provider.send('eth_sendRawTransaction', ethers.utils.serializeTransaction(tx)).then(re => {
//   console.log('send raw: ', re)
// }).catch(err => {
//   console.error(err)
// })
signer.signMessage(ethers.utils.serializeTransaction(tx)).then(re => {
  console.log('get sign result:', re)
  signed = re
  let tra = {
    data: signed
  }
})

let a = '0xf86b80850826299e0082a41094ee739257382d1b189d901092ca4c4e04ec6749178786a5d964fcc0008025a09ba2be4d1583f88c3047bc55b23e330427ad34ce09640d8b51bd33266337d01fa0171348bef9fb9f3a2476a1500d63eda83bbafed2b4e3a130448a17bf502b5aa6'
let b = '0x39d079c8528357ccee0eb58a223be1978546273760c4cf6d751bcc72789840a50ffac4cda14c4b47678ac80f639b0128f182777c741c37617bb8fe3124261aa301'
let c = '0xf86c808506fc23ac00825208947e1ff8c150101c38507383b19662f5559e987959880de0b6b3a7640000801ba0a0a7f2b93acd9b2042ace14970ca10c786c52493929f7e2e647de4e4838f31bca0359ed48719bdf77418dd99df5c6ca15e6e07dbe39b1a9195ce576ff61834a5b9'