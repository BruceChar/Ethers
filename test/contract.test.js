const es = require('ethers')

const CInstance = require('../src/Contract')
const Wallet = require('../src/Wallet')
const {RPC} = require('../src/provider')
const {lurl, purl, acts, CAddr, CABI, exoAddr, exoABI} = require('./mock')

let pro = RPC(lurl)
let sig = pro.getSigner()

let abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x06fdde03"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x18160ddd"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x313ce567"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x70a08231"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x95d89b41"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdd62ed3e"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event",
    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event",
    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa9059cbb"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x095ea7b3"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "token",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x23b872dd"
  }
]

// console.log(pro, sig)

// let INS = new CInstance(exoAddress, exoABI)
let INS = new CInstance(CAddr, CABI, pro)
// console.log('contract instance: ', INS)
let pINS = INS.connect(RPC(purl))
// let pINS = INS.connect(pro)
// let sINS = INS.connect(sig)

// console.log(pINS, sINS)

let GVTN = '0x7B86CC8BE9C76EEB4325255451E9603B9AF8C76E847E5C61F7D81440E7EBBB6D'

let sender = Wallet.fromPrivateKey(GVTN, pro)
let receiver = '0xF6b20b5D12B1D2a72647dD06210580E7c385CAF0'

console.log("Sender: ", sender)

// console.log('Contract instance: \n', INS, pINS)
let tx = {
  to: CAddr,
  value: es.utils.parseEther('0'),
  gasPrice: es.utils.parseEther('0.000000024'),
  gasLimit: 60000,
}

function testDeciamls() {
  pINS.unit().then(re => {
    console.log('get decimals:', re)
  })
}

function testSymbol() {
  pINS.symbol().then(re => {
    console.log('get symbol:', re)
  }).catch(err => {
    console.error('get symbol error: ', err)
  })
}

function testBalance(addr) {
  pINS.balance(addr).then(re => {
    console.log('get token balance:', addr, re)
  })
}

// Bug: from, use Signer.sendTransaction()
function testTransfer(to, value) {
  sINS.transfer(to, value).then(re => {
    console.log('get transfer result:', re)
  }).catch(err => {
    console.error('transfer error: ', err)
  })
}

function testAllowance() {
  pINS.getAllowance(acts[0], acts[1]).then(re => {
    console.log('allowance: ', re)
  })
}

function testSupply() {
  pINS.totalSupply().then(re => {
    console.log('total suppley is:', re.toString())
  })
}

async function testSendTransaction(to, value) {
  let dat = await INS.transferData(to, value)
  console.log('get transfer data:', dat)

  let t = {...tx, to: exoAddress, data: dat}
  console.log('ready to send: ', t)
  sender.sendTransaction(t).then(res => {
    console.log('send transaction result:', res)
  })
}

(function main() {
  testAllowance()
  // console.log(pINS.address, pINS.interface, pINS.provider, pINS.signer)
  // let nIns = pINS.connect(RPC(purl))
  // console.log('new instance:', nIns)
})()