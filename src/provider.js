const es = require('ethers')
  /**
   * ******************* account methods ************************
   * 
   * @method getTransactionCount (address) => Promise
   *         -- alias nonce
   * 
   * @method getBalance (address) => Promise(BigNumber)
   *         -- get ether balance of address
   * 
   * ******************* block methods **************************
   * 
   * @method getBlock (blockNumber || hash) => Promise
   *         -- only block detail and transactions hash
   * 
   * @method getBlockWithTransactions(blockNumber || hash) => Promise
   *         -- with transactions detail
   * 
   * @method getTransaction (hash) => Promise
   *         -- transaction info,
   *         -- including nonce, networkId, chainId, data, r, s, v and so on
   * 
   * @method getTransactionReceipt (hash) => Promise
   *         -- transaction receipt result, 
   *         -- including logs,gasUsed, status(1-success), confirmations and so on
   * 
   * ***************** network status ***************************
   * 
   * @method getBlockNumber () => Promise(BigNumber)
   * 
   * @method getGasPrice () => Promise(BigNumber)
   * 
   * @method getNetwork () => Promise({chainId, name})
   * 
   * ***************** transaction methods **********************
   * 
   * @method call (transaction [, blockTag = latest]) => Promise
   *         -- doesn't require ether and cannot change any state
   * 
   * @method sendTransaction (signedTransaction: string) => Promise
   * 
   * @method waitForTransaction (hahs [, confirms = 1 [, timeout]])
   * 
   * @method estimateGas (transaction) => Promise(BigNumber)
   *         -- {to: notNull}
   *         -- data will influence the result
   * 
   * ******************* logs methods *****************************
   * filter: {
   *    fromBlock?: BlockTag; //string or number,string: 'latest' 'pending'
   *    toBlock?: BlockTag;
   *    address?: string; // contract address
   *    topics?: Array<string | Array<string>>; // [event, [fromAddress...], [toAddress...]]
   * }
   * @method getLogs (filter) => Promise(list<log>)
   * 
   * ******************* event emitter methods ********************
   * event name:
   * "block"	  blockNumber	        emitted when a new block is mined	 
   * "error"	  error	              emitted on any error	 
   * "pending"	pendingTransaction	emitted when a new transaction enters the memory pool; only certain providers offer this event and may require running your own node for reliable results	 
   * "willPoll"	pollId	            emitted prior to a polling loop is about to begin; (very rarely used by most developers)	 
   * "poll"	    pollId, blockNumber	emitted during each poll cycle after `blockNumber` is updated (if changed) and before any other events (if any) are emitted during the poll loop; (very rarely used by most developers)	 
   * "didPoll"	pollId	            emitted after all events from a polling loop are emitted; (very rarely used by most developers)	 
   * "debug"	  provider dependent	each Provider may use this to emit useful debugging information and the format is up to the developer; (very rarely used by most developers)
   * 
   * @method on (eventName, listener: function) => this
   * @method once (eventName, listener: function) => this
   * @method off (eventName, listener: function) => this
   * ...
   * 
   */

function rpcProvider(url = null) {
  /**
   * ******************* JSON rpc methods *****************************
   * 
   * @method send (method, params) => Promise
   *         -- can be uset to access all json-rpc methods
   *         -- and personal/admin/miner/debug... rpc call
   * 
   * @method listAccounts () => Promise(list)
   * 
   * @method getSigner ([indexOrAddress]) => JsonRpcSigner
   */
  return new es.providers.JsonRpcProvider(url)
}

function ipcProvider(path = null) {
  if (path === null) {
    console.log('IPC path cannot be null!')
    return null
  }
  return new es.providers.IpcProvider(path)
}

/**
 * TODO: 返回错误
 */
function ethscan() {
  let pro = new es.providers.EtherscanProvider('ropsten')
  console.log('ropsten:', pro)
  let rin = new es.providers.EtherscanProvider('rinkeby')
  console.log('rinbeky:', rin)
  rin.getBlockNumber().then(re => {
    console.log('block number:', re)
  }).catch(err => {
    console.error('get block number error:', err)
  })
}

// WebSocketProvider

// Web3Provider


module.exports = {
  RPC: rpcProvider,
  IPC: ipcProvider,
}