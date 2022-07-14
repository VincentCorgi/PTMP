// 引用 npm install web3
import Web3 from 'web3'
// 創建web3實例
const web3 = new Web3(Web3.givenProvider || 'ws://http://192.168.12.220:8080')
// 合約地址
const contractAddress = '0x17958e96AEE6A9Aaa388C3663Bc61685357EA879'
// 合約abi
const contractABI = [
  { // 新增廠商 addManufacturer
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contact',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contactNumber',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contactAddress',
        type: 'string'
      }
    ],
    name: 'addManufacturer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { // 新增標案 addTender
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'procurementProperty',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'tenderMethod',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'publishingDate',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'budgetAmount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'biddingDeadline',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'openingDate',
        type: 'string'
      }
    ],
    name: 'addTender',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { // 新增投標 addTenderBidder
    inputs: [
      {
        internalType: 'uint256',
        name: 'tenderId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'exerciseDate',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: 'isSME',
        type: 'bool'
      }
    ],
    name: 'addTenderBidder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { // 標案數量 amountTender
    inputs: [],
    name: 'amountTender',
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
  { // 取得投標商地址 getBiddersAddress
    inputs: [
      {
        internalType: 'uint256',
        name: 'tenderId',
        type: 'uint256'
      }
    ],
    name: 'getBiddersAddress',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  { // 投標查詢（單筆） lookupBidder
    inputs: [
      {
        internalType: 'uint256',
        name: 'tenderId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'addr',
        type: 'address'
      }
    ],
    name: 'lookupBidder',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  { // 廠商列表 manufacturers
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'manufacturers',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contact',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contactNumber',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contactAddress',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  { // 標案列表 tenders
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
        internalType: 'address',
        name: 'addr',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'procurementProperty',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'tenderMethod',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'publishingDate',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'budgetAmount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'biddingDeadline',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'openingDate',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
// 連接合約
const ethContract = new web3.eth.Contract(contractABI, contractAddress)
// 導出ethContract
export { ethContract }
