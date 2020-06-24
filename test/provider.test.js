const es = require('ethers')

const {RPC} = require('../src/provider')
const {lurl, purl, acts, CAddr, CABI} = require('./mock')

let lpro = RPC(lurl)
let epro = RPC(purl)

let pro = lpro

function getAccounts() {
  pro.listAccounts().then(re => {
    acts = re
    console.log('get accounts:', re)
  })
}

function getBlockNumber() {
  pro.getBlockNumber().then(re => {
    console.log('block number:', re)
  })
}

function getGasPrice() {
  pro.getGasPrice().then(re => {
    console.log('gas price:', re, re.toString())
  })
}

function estimateGas() {
  pro.estimateGas({
    to: '0x87F00C01BE18c6b203E17aB5398ca2BE7034DF22',
    value: es.utils.parseEther('1'),
    data: '0xa9059cbb000000000000000000000000493ccb94927908cf709165deb5b380dbef1ac0f40000000000000000000000000000000000000000000000000000ab1cbb36934'
  }).then(re => {
    console.log('get gas limit: ', re, re.toString())
  })
}


function getBlock(block=null) {
  if (block === null) {
    console.error('参数不能为空，至少指定block number或者block hash!')
    return null
  }
  pro.getBlock(block).then(re => {
    console.log('get block result:', re)
  }).catch(err => {
    console.error(err)
  })
}


function getTransaction(hash=null) {
  pro.getTransaction(hash).then(re => {
    console.log('get transaction result:', re)
  }).catch(err => {
    console.error(err)
  })
}


function getTransactionReceipt(hash) {
  pro.getTransactionReceipt(hash).then(re => {
    console.log('get transaction receipt:', re)
  }).catch(err => {
    console.error(err)
  })
}


function getNetwork() {
  pro.getNetwork().then(re => {
    console.log('get network:', re)
  }).catch(err => {
    console.error(err)
  })
}

function getTransactionCount() {
  pro.getTransactionCount(acts[0]).then(re => {
    console.log('get transaction count:', re)
  })
}

function getBalance() {
  pro.getBalance(acts[1]).then(re => {
    console.log('get balance of:', acts[1], re.toString())
  })
}


/************************************ Logs ********************************************/
/**
 * fromBlock?: BlockTag; string or number,string: 'latest' 'pending'
 * toBlock?: BlockTag;
 * address?: string;
 * topics?: Array<string | Array<string>>;
 * @NOTE address is capital sensetive, 0x8Ea != 0x8ea
 * 
 * // List all token transfers  *to*  myAddress or myOtherAddress:
    filter = {
        address: tokenAddress,
        topics: [
            id("Transfer(address,address,uint256)"),
            null,
            [
                hexZeroPad(myAddress, 32),
                hexZeroPad(myOtherAddress, 32),
            ]
        ]
    }
 */

let filter = {
  address: CAddr,
  fromBlock: 0,
  toBlock: 50,
  topics: [
    es.utils.id("Transfer(address,address,uint256)"),
    es.utils.hexZeroPad('0x87f00c01be18c6b203e17ab5398ca2be7034df22', 32)
    // null
    // [
    //   es.utils.hexZeroPad('0xb5bd44fdb5ce6b7d720eee7a8160cb45aadb4f55', 32)
    // ]
  ]
}
function getLogs() {
  pro.getLogs(filter).then(re => {
    if (re.length == 0) {
      console.log('No logs!', filter)
      return
    }
    re.map((log, i, logs) => {
      console.log('------------%d---------:\n', i)
      console.log('from: ', log.topics[1].replace('000000000000000000000000', ''))
      console.log('to: ', log.topics[2].replace('000000000000000000000000', ''))
    })
  })
}

(function() {
  // getBlock(50)
  // getTransaction('0x0d4d02f7dcc08b2e93f1c22e1704a7d0097f8066aaf5d7414e6fc830d35a1880')
  // getTransactionReceipt('0x0d4d02f7dcc08b2e93f1c22e1704a7d0097f8066aaf5d7414e6fc830d35a1880')
  // getBalance()
  // estimateGas()
  // getLogs()

})()
