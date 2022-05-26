<template>
  <div class="navbar">
    ip: 163.13.138.226
    <span style="color: white">Navbar</span>
    <span style="color: white">{{ name }}</span>
    <div v-show="$route.name === 'Dashboard'">
      <button @click="addTender">新增招標</button>
      <button @click="logout">登出</button>
      <b-button variant="danger" @click="test">測試鈕</b-button>

    </div>
    <div v-show="$route.name === 'AddTender'">
      <button @click="save">確認</button>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
export default {
  name: 'Navbar',
  data () {
    return {
      address: '',
      name: ''
    }
  },
  // computed: {
  //   ...mapState({
  //     address: state => state.address
  //   })
  // },
  // mounted () {
  //   console.log(this.address)
  // },
  methods: {
    async test () {
      // 建立web3
      const web3 = new Web3(Web3.givenProvider || 'ws://http://192.168.12.220:8080')
      // 拿取當前地址
      // console.log(web3.eth.getAccounts(console.log))
      const fromAddress = web3.eth.accounts[0]
      this.address = fromAddress
      // 合約地址
      const contractAddress = '0x88493AFD632242304922B140E6247E44A24e19EF'
      // 合約abi
      const contractABI = [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string'
            },
            {
              internalType: 'string',
              name: 'subjectProcurement',
              type: 'string'
            }
          ],
          name: 'addTender',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [],
          name: 'getCount',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address'
            }
          ],
          name: 'tenderList',
          outputs: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string'
            },
            {
              internalType: 'string',
              name: 'subjectProcurement',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        { // 在tenders拿值
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          name: 'tenders',
          outputs: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string'
            },
            {
              internalType: 'string',
              name: 'subjectProcurement',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ]
      // 連接合約
      const ethContract = new web3.eth.Contract(contractABI, contractAddress)

      // ethContract.methods
      //   .addTender('範例二', '對')
      //   .send(
      //     {
      //       from: '0x904e7C77c7D5ed71A19eF218e7962CF074aB8346'
      //     }
      //   )
      //   .then(function (receipt) {
      //     console.log(receipt)
      //   })
      const list = []
      const amount = await ethContract.methods
        .getCount()
        .call(
          {
            from: '0x904e7C77c7D5ed71A19eF218e7962CF074aB8346'
          }
        )
        .then(function (receipt) {
          return receipt
        })
      for (let i = 0; i < 2; i++) {
        const tender = await ethContract.methods
          .tenders(i)
          .call(
            {
              from: '0x904e7C77c7D5ed71A19eF218e7962CF074aB8346'
            }
          )
          .then(function (receipt) {
            return receipt
          })
        list.push(tender)
      }
      this.name = list.map(item => {
        return { name: item.name, subjectProcurement: item.subjectProcurement }
      })
      // const aaa = await ethContract.methods
      //   .tenders(0)
      //   .call(
      //     {
      //       from: '0x904e7C77c7D5ed71A19eF218e7962CF074aB8346'
      //     }
      //   )
      //   .then(function (receipt) {
      //     return receipt
      //   })
    },
    addTender () {
      this.$router.push({ name: 'AddTender' })
    },
    logout () {
      this.$router.push({ name: 'Login' })
    },
    save () {
      this.$router.push({ name: 'Dashboard' })
    },
    back () {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #000 !important;
}
</style>
