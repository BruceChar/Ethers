/**
 * The most common Signers is Wallet and JsonRpcSigner.
 * 
 * @Property provider
    The provider that this Signer is connected to.

 * @method getAddress () => Promise<Address>
     account address of signer

 * @method isSigner () => boolean

 * @method getBalance([ blockTag = “latest” ]) => Promise<BigNumber>
    account ether balance of signer

 * @method getTransactionCount ([blockTag = “latest”]) => Promise<number>
    Returns a Promise for the account transaction count. 
    This can be used to determine the next nonce to use for a transaction.

 * @method sendTransaction (transactionRequest) => Promise<TransactionResponse>
    Returns a Promise that resolves to the Transaction Response for the sent transaction.
    If an error occurs after the netowrk may have received the transaction, 
    the promise will reject with the error, with the additional property
     transactionHash so that further processing may be done.

 * @method signTransaction (transactionRequest) => Promise
  
  
 * @method signMessage (message) => Promise<hex>
    Returns a Promise that resolves the signature of a signed message, 
    in the Flat Format.

 * @method unlock (password) => Promise<boolean>
    Returns account lock status, if unlock true, else false, 
    depending on whether the account unlock was successful.
 */

 const es = require('ethers')

 function isSigner(sig) {
   return es.Signer.isSigner(sig)
 }