import web3 from './web3';

const address = '0xc7115a5b6ca5f5a5968b95f49f47b61e8ad899d6';

const abi = [
  {
    constant: false,
    inputs: [{ name: 'questionId', type: 'uint256' }],
    name: 'createQuestion',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'reciepent', type: 'address' },
      { name: 'questionId', type: 'uint256' },
    ],
    name: 'acceptAnswer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// @ts-ignore
export default new web3.eth.Contract(abi, address);
