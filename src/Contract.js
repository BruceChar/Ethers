const es = require('ethers')
const Contract = es.Contract

class ContractInstance extends Contract {
  // #ERC20 contract
  constructor (address, abi, offer = null) {
    // if offer is null, connect to provider or signer manully later
    // with `.connect(signer || provider)`
    super(address, abi, offer)
  }

  transferData(to, value) {
    return this.populateTransaction.transfer(to, value)
    .then(re => {
      return re.data
    })
  }

  // these methods below was return bigNumber default
  balance(owner) {
    return this.balanceOf(owner).then(re => {
      return re.toString()
    })
  }

  getAllowance(owner, spender) {
    return this.allowance(owner, spender).then(re => {
      return re.toString()
    })
  }

  decimals() {
    return this.decimals().then(re => {
      return re.toString()
    })
  }
}

module.exports = ContractInstance