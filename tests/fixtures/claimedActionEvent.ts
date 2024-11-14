import {
  ActionEvent,
  PreviousActionRunInfo,
  ActionRequestData,
  ActionSecretsMap,
} from "@openzeppelin/defender-sdk-action-client";

// Refer: https://sepolia.etherscan.io/tx/0xe9b7ce35b8a18ae9bd372ff14c4cd94f471d349445bf2e6df29866b2d22370b5
export const claimSepoliaLonActionEvent: ActionEvent = {
  //   autotaskId: "0db2ebe2-d445-4d2c-8f90-6e7238db6a4b",
  //   autotaskName: "Emit ClaimToken Claimed()",
  //   autotaskRunId: "ff6a3b56-2877-4aba-ad61-6e24bca99821",
  credentials: "",
  kvstoreARN:
    "arn:aws:lambda:us-west-2:665768922667:function:defender-prod-proxy-kvstore:53a646db-9d19-491c-9835-85de49af3ac0_STORE",
  previousRun: {
    trigger: "monitor", // "sentinel",
    status: "success",
    createdAt: "2024-11-07T10:18:45.757Z",
    // autotaskId: "0db2ebe2-d445-4d2c-8f90-6e7238db6a4b",
    actionId: "0db2ebe2-d445-4d2c-8f90-6e7238db6a4b",
    // result: "null",
    // statusCreatedAt: "success|2024-11-07T10:18:45.757Z",
    // autotaskRunId: "5eadc84f-7fc2-4829-a535-16f04a13996f",
    actionRunId: "5eadc84f-7fc2-4829-a535-16f04a13996f",
  } as PreviousActionRunInfo,
  //   tenantId: "53a646db-9d19-491c-9835-85de49af3ac0",
  //   trigger: "sentinel",
  actionId: "0db2ebe2-d445-4d2c-8f90-6e7238db6a4b",
  actionName: "Emit ClaimToken Claimed()",
  actionRunId: "ff6a3b56-2877-4aba-ad61-6e24bca99821",
  secrets: {
    ALCHEMY_API_KEY: "",
    DISCORD_CLAIMTOKEN_CHANNEL_WEBHOOK: "",
    SLACK_CLAIMTOKEN_CHANNEL_WEBHOOK: "",
    CLAIM_TOKEN_LIST:
      '[{"chainId":10,"tokenSymbol":"UNI","tokenAddress":"0x6fd9d7AD17242c41f7131d257212c54A0e816691","totalAmount":1000000.123456789},{"chainId":10,"tokenSymbol":"USDT","tokenAddress":"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"USDT","tokenAddress":"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"DAI","tokenAddress":"0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1","totalAmount":1000000.123456789},{"chainId":42161,"tokenSymbol":"LON","tokenAddress":"0x55678cd083fcDC2947a0Df635c93C838C89454A3","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WBTC","tokenAddress":"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"USDC","tokenAddress":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831","totalAmount":1000000.1234567},{"chainId":42161,"tokenSymbol":"WETH","tokenAddress":"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"DAI","tokenAddress":"0xC8c4EFA54D6774F55DD09134a901865ff286321e","totalAmount":23332.4},{"chainId":11155111,"tokenSymbol":"LON","tokenAddress":"0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa","totalAmount":483183.4},{"chainId":11155111,"tokenSymbol":"USDC","tokenAddress":"0xa07DD8cb5A5c4254B5da0456AFD597A60a92b633","totalAmount":1000000.1234567},{"chainId":11155111,"tokenSymbol":"USDT","tokenAddress":"0x63b26b83c6f38433B2b6a7214fC2c569a4F4069A","totalAmount":492835.123456789},{"chainId":11155111,"tokenSymbol":"WBTC","tokenAddress":"0x7fA5E99D78FB17379C467B3dC5D0F63AcED6a80D","totalAmount":468.123456789},{"chainId":11155111,"tokenSymbol":"WETH","tokenAddress":"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14","totalAmount":1000000.1234567},{"chainId":11155420,"tokenSymbol":"USDC","tokenAddress":"0x5fd84259d66Cd46123540766Be93DFE6D43130D7","totalAmount":1000000.1234567},{"chainId":421614,"tokenSymbol":"USDC","tokenAddress":"0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d","totalAmount":1000000.1234567}]',
  } as ActionSecretsMap,
  request: {
    body: {
      hash: "0xe9b7ce35b8a18ae9bd372ff14c4cd94f471d349445bf2e6df29866b2d22370b5",
      transaction: {
        blockHash:
          "0xfc1547c587286e6f5b81045d6c7368c65641e89b09da06ee33373833b1a74daf",
        blockNumber: "0x6b4373",
        contractAddress: null,
        cumulativeGasUsed: "0x6f40dd",
        effectiveGasPrice: "0x2e09d16b7",
        from: "0x8096334c0bdc58f7e86ec38bcde3a43afa04d477",
        gasUsed: "0x17ff0",
        logs: [
          {
            address: "0x6c1851b852f05bdc7c0be1a088532e4999fd94fa",
            topics: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000005ad1dab7bffdb622af8b88882dde9edf1f01f17a",
              "0x0000000000000000000000009d4d6788d571efdb616b746c6a8e7247b16ef9b7",
            ],
            data: "0x0000000000000000000000000000000000000000000000001d4839d21c130000",
            blockNumber: "0x6b4373",
            transactionHash:
              "0xe9b7ce35b8a18ae9bd372ff14c4cd94f471d349445bf2e6df29866b2d22370b5",
            transactionIndex: "0x37",
            blockHash:
              "0xfc1547c587286e6f5b81045d6c7368c65641e89b09da06ee33373833b1a74daf",
            logIndex: "0x61",
            removed: false,
          },
          {
            address: "0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a",
            topics: [
              "0x8d57f9f57997efb57ed0839bfe4bb920cfb8004fd80cdac63be1acd419d4c28a",
              "0x0000000000000000000000006c1851b852f05bdc7c0be1a088532e4999fd94fa",
              "0x0000000000000000000000009d4d6788d571efdb616b746c6a8e7247b16ef9b7",
              "0x0000000000000000000000000000000000000000000000001d4839d21c130000",
            ],
            data: "0xfc3c26d81932ea906001b0c24b1e7d8412e5633a55b877dc4fd31df3e46028ad000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000838666133356439630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041c214cb97595e4c8ea5094a691d69d9d5c1a86abf9cf910da1e60897b5716a49f77421e25119429a072fcb457d8911224b57c63d7e2afbe5cf9c5f6eb829fe7df1c00000000000000000000000000000000000000000000000000000000000000",
            blockNumber: "0x6b4373",
            transactionHash:
              "0xe9b7ce35b8a18ae9bd372ff14c4cd94f471d349445bf2e6df29866b2d22370b5",
            transactionIndex: "0x37",
            blockHash:
              "0xfc1547c587286e6f5b81045d6c7368c65641e89b09da06ee33373833b1a74daf",
            logIndex: "0x62",
            removed: false,
          },
        ],
        logsBloom:
          "0x00000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001000000100000004000000000000000000000028000000000900000000000000000000004000000000000000000000000006000000800000000000000000000000000010000000000000000000000000000400008000000000000000000000000000000000000000000000000000000800080000000000000000000000080000000000000000000000000802000000000100000000000000000000000000000000010000002000010000000000000000000000000000000000000000000000000000000000000000",
        status: "0x1",
        to: "0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a",
        transactionHash:
          "0xe9b7ce35b8a18ae9bd372ff14c4cd94f471d349445bf2e6df29866b2d22370b5",
        transactionIndex: "0x37",
        type: "0x2",
      },
      blockHash:
        "0xfc1547c587286e6f5b81045d6c7368c65641e89b09da06ee33373833b1a74daf",
      blockNumber: "0x6b4373",
      timestamp: 1730976456,
      matchReasons: [
        {
          type: "event",
          signature: "Claimed(bytes32,address,string,address,uint256,bytes)",
          address: "0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a",
          args: [
            "0xfc3c26d81932ea906001b0c24b1e7d8412e5633a55b877dc4fd31df3e46028ad",
            "0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa",
            "8fa35d9c",
            "0x9d4D6788D571EfdB616b746c6A8e7247B16EF9B7",
            "2110000000000000000",
            "0xc214cb97595e4c8ea5094a691d69d9d5c1a86abf9cf910da1e60897b5716a49f77421e25119429a072fcb457d8911224b57c63d7e2afbe5cf9c5f6eb829fe7df1c",
          ],
          params: {
            claimHash:
              "0xfc3c26d81932ea906001b0c24b1e7d8412e5633a55b877dc4fd31df3e46028ad",
            tokenAddress: "0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa",
            eventID: "8fa35d9c",
            userAddress: "0x9d4D6788D571EfdB616b746c6A8e7247B16EF9B7",
            amount: "2110000000000000000",
            signerSignature:
              "0xc214cb97595e4c8ea5094a691d69d9d5c1a86abf9cf910da1e60897b5716a49f77421e25119429a072fcb457d8911224b57c63d7e2afbe5cf9c5f6eb829fe7df1c",
          },
        },
      ],
      matchedAddresses: ["0x5ad1dab7bffdb622af8b88882dde9edf1f01f17a"],
      matchedChecksumAddresses: ["0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A"],
      sentinel: {
        id: "d0b679b2-53cb-4a5e-b61f-83d529982ec8",
        name: "Emit ClaimToken Claimed() Sepolia",
        abi: [
          {
            type: "event",
            anonymous: false,
            name: "Claimed",
            inputs: [
              {
                type: "bytes32",
                name: "claimHash",
                indexed: false,
              },
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: false,
              },
              {
                type: "address",
                name: "userAddress",
                indexed: true,
              },
              {
                type: "uint256",
                name: "amount",
                indexed: true,
              },
              {
                type: "bytes",
                name: "signerSignature",
                indexed: false,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "EventCreated",
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "EventUpdated",
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: true,
              },
              {
                type: "bool",
                name: "isEventClosed",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "OwnershipTransferStarted",
            inputs: [
              {
                type: "address",
                name: "previousOwner",
                indexed: true,
              },
              {
                type: "address",
                name: "newOwner",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "OwnershipTransferred",
            inputs: [
              {
                type: "address",
                name: "previousOwner",
                indexed: true,
              },
              {
                type: "address",
                name: "newOwner",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "SignerUpdated",
            inputs: [
              {
                type: "address",
                name: "signer",
                indexed: true,
              },
              {
                type: "bool",
                name: "isActivated",
                indexed: true,
              },
            ],
          },
          {
            type: "function",
            name: "acceptOwnership",
            constant: false,
            payable: false,
            inputs: [],
            outputs: [],
          },
          {
            type: "function",
            name: "claim",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
              {
                type: "uint256",
                name: "amount",
              },
              {
                type: "bytes",
                name: "signerSignature",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "createNewEvent",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "bool",
                name: "startEvent",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "getClaimHash",
            constant: true,
            stateMutability: "pure",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
              {
                type: "uint256",
                name: "amount",
              },
            ],
            outputs: [
              {
                type: "bytes32",
              },
            ],
          },
          {
            type: "function",
            name: "getClaimStatus",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
            ],
            outputs: [
              {
                type: "uint256",
                name: "claimedAmount",
              },
            ],
          },
          {
            type: "function",
            name: "getEvent",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
            ],
            outputs: [
              {
                type: "bool",
                name: "isEventClosed",
              },
            ],
          },
          {
            type: "function",
            name: "getSigners",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address[]",
              },
            ],
          },
          {
            type: "function",
            name: "isSignerActivated",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "_signer",
              },
            ],
            outputs: [
              {
                type: "bool",
                name: "isActivated",
              },
            ],
          },
          {
            type: "function",
            name: "owner",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address",
              },
            ],
          },
          {
            type: "function",
            name: "pendingOwner",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address",
              },
            ],
          },
          {
            type: "function",
            name: "renounceOwnership",
            constant: false,
            payable: false,
            inputs: [],
            outputs: [],
          },
          {
            type: "function",
            name: "transferOwnership",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "newOwner",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "updateEvent",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "bool",
                name: "isEventClosed",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "updateSigners",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address[]",
                name: "signerList",
              },
              {
                type: "bool[]",
                name: "isActivatedList",
              },
            ],
            outputs: [],
          },
        ],
        addresses: ["0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A"],
        confirmBlocks: "finalized",
        network: "sepolia",
        chainId: 11155111,
      },
      monitor: {
        id: "d0b679b2-53cb-4a5e-b61f-83d529982ec8",
        name: "Emit ClaimToken Claimed() Sepolia",
        abi: [
          {
            type: "event",
            anonymous: false,
            name: "Claimed",
            inputs: [
              {
                type: "bytes32",
                name: "claimHash",
                indexed: false,
              },
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: false,
              },
              {
                type: "address",
                name: "userAddress",
                indexed: true,
              },
              {
                type: "uint256",
                name: "amount",
                indexed: true,
              },
              {
                type: "bytes",
                name: "signerSignature",
                indexed: false,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "EventCreated",
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "EventUpdated",
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
                indexed: true,
              },
              {
                type: "string",
                name: "eventID",
                indexed: true,
              },
              {
                type: "bool",
                name: "isEventClosed",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "OwnershipTransferStarted",
            inputs: [
              {
                type: "address",
                name: "previousOwner",
                indexed: true,
              },
              {
                type: "address",
                name: "newOwner",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "OwnershipTransferred",
            inputs: [
              {
                type: "address",
                name: "previousOwner",
                indexed: true,
              },
              {
                type: "address",
                name: "newOwner",
                indexed: true,
              },
            ],
          },
          {
            type: "event",
            anonymous: false,
            name: "SignerUpdated",
            inputs: [
              {
                type: "address",
                name: "signer",
                indexed: true,
              },
              {
                type: "bool",
                name: "isActivated",
                indexed: true,
              },
            ],
          },
          {
            type: "function",
            name: "acceptOwnership",
            constant: false,
            payable: false,
            inputs: [],
            outputs: [],
          },
          {
            type: "function",
            name: "claim",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
              {
                type: "uint256",
                name: "amount",
              },
              {
                type: "bytes",
                name: "signerSignature",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "createNewEvent",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "bool",
                name: "startEvent",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "getClaimHash",
            constant: true,
            stateMutability: "pure",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
              {
                type: "uint256",
                name: "amount",
              },
            ],
            outputs: [
              {
                type: "bytes32",
              },
            ],
          },
          {
            type: "function",
            name: "getClaimStatus",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "address",
                name: "userAddress",
              },
            ],
            outputs: [
              {
                type: "uint256",
                name: "claimedAmount",
              },
            ],
          },
          {
            type: "function",
            name: "getEvent",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
            ],
            outputs: [
              {
                type: "bool",
                name: "isEventClosed",
              },
            ],
          },
          {
            type: "function",
            name: "getSigners",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address[]",
              },
            ],
          },
          {
            type: "function",
            name: "isSignerActivated",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [
              {
                type: "address",
                name: "_signer",
              },
            ],
            outputs: [
              {
                type: "bool",
                name: "isActivated",
              },
            ],
          },
          {
            type: "function",
            name: "owner",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address",
              },
            ],
          },
          {
            type: "function",
            name: "pendingOwner",
            constant: true,
            stateMutability: "view",
            payable: false,
            inputs: [],
            outputs: [
              {
                type: "address",
              },
            ],
          },
          {
            type: "function",
            name: "renounceOwnership",
            constant: false,
            payable: false,
            inputs: [],
            outputs: [],
          },
          {
            type: "function",
            name: "transferOwnership",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "newOwner",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "updateEvent",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address",
                name: "tokenAddress",
              },
              {
                type: "string",
                name: "eventID",
              },
              {
                type: "bool",
                name: "isEventClosed",
              },
            ],
            outputs: [],
          },
          {
            type: "function",
            name: "updateSigners",
            constant: false,
            payable: false,
            inputs: [
              {
                type: "address[]",
                name: "signerList",
              },
              {
                type: "bool[]",
                name: "isActivatedList",
              },
            ],
            outputs: [],
          },
        ],
        addresses: ["0x5ad1DAb7BfFdB622AF8B88882DDE9EDF1F01F17A"],
        confirmBlocks: "finalized",
        network: "sepolia",
        chainId: 11155111,
      },
      type: "BLOCK",
      value: "0x0",
    },
  } as ActionRequestData,
};
