// 引用 npm install web3
import Web3 from 'web3'
// 創建web3實例
const web3 = new Web3(Web3.givenProvider || 'ws://http://192.168.12.220:8080')
// 合約地址
const contractAddress = '0x583899C76E479559Fa17c7E122941c4862B44e67'
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
  {
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
  {
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tenderId',
        type: 'uint256'
      }
    ],
    name: 'selectedAwardBidder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
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
  {
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
  {
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
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'manufacturerList',
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'tenderList',
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
      },
      {
        internalType: 'uint256',
        name: 'state',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address'
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
        internalType: 'struct Simple.Bidder',
        name: 'awardBidder',
        type: 'tuple'
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
