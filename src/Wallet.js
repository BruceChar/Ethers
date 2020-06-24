/**
 * A signer connect to a provider
 * 
 * @method new Wallet(privateKey [, provider])
 * 
 * @method createRandom([options])  => Wallet
 *         -- will have a mnemonic
 * 
 * @method fromEncryptedJson (json, password [, progress: function]) => Promise
 * 
 * @method fromEncryptedJsonSync (json, password) ⇒ Wallet
 * 
 * @method fromMnemonic(mnemonic [, path[, wordlist]]) => Wallet
 *         -- path m/44/60/0/0/0 see BIP32
 * 
 * @method encrypt (password [, options [, progress: function]]) => Promise
 *          We override the default scrypt.N value, which is used
 *          to indicate the difficulty to crack this wallet.
 *         options: {
            scrypt: {
              // The number must be a power of 2 (default: 131072)
              N: 64
            }
           }
 * @property address
 * @property provider
 * @property publicKey
 */

const ethers = require('ethers')

class Wallet extends ethers.Wallet {
  constructor(privateKey, provider) {
    super(privateKey, provider)
  }

  static providerOk() {
    return this.defaultProvider != null && this.defaultProvider != undefined
  }

  static setProvider(provider) {
    this.defaultProvider = provider
  }

  static clearProvider() {
    this.defaultProvider = null
  }

  static fromPrivateKey(pkey, provider = null) {
    if (provider == null) return new Wallet(pkey)
    if (this.providerOk()) { 
      return new Wallet(pkey, this.defaultProvider) 
    }
    return new Wallet(pkey, provider)
  }

  personalNewAccount(pwd) {
    this.send('personal_newAccount', pwd).then(re => {
      console.log('create new personal account:', re)
    })
  }
}
module.exports = Wallet