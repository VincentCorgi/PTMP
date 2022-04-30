// web3.js
// 智能合约地址
const contractAddress = '.....'
// 智能合约ABI
const contractABI = []
let contract = null
/**
 * 初始化
 * @param {Object} callback 返回账户地址
 */
function Init (callback) {
  // 判断用户是否安装MetaMask钱包插件
  if (typeof window.ethereum === 'undefined') {
    // 没安装MetaMask钱包进行弹框提示
    alert('Looks like you need a Dapp browser to get started.')
    alert('Consider installing MetaMask!')
  } else {
    // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    window.ethereum.enable()
      .catch(function (reason) {
        // 如果用户拒绝了登录请求
        if (reason === 'User rejected provider access') {

          // 用户拒绝登录后执行语句；
        } else {
          // 本不该执行到这里，但是真到这里了，说明发生了意外
          alert('There was an issue signing you in.')
        }
      }).then(function (accounts) {
        // 如果用户同意了登录请求，你就可以拿到用户的账号
        const currentProvider = web3.currentProvider
        const Web3 = web3js.getWeb3()
        web3 = new Web3()
        web3.setProvider(currentProvider)
        contract = new web3.eth.Contract(contractABI, contractAddress)
        // console.log('地址列表', accounts)
        // 这里返回用户钱包地址
        callback(accounts[0])
      })
  }
}
// 导出相应的方法
export default {

  init
}
