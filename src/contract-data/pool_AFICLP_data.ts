const stakingReward_data = {
    address:import.meta.env.VITE_AFICLP_POOL,
    abi:
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint32",
                    "name": "_orderId",
                    "type": "uint32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_RREWARD_TOKEN",
                    "type": "uint256"
                }
            ],
            "name": "Claimed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_RREWARD_TOKEN",
                    "type": "uint256"
                }
            ],
            "name": "ClaimedAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint16",
                    "name": "_days",
                    "type": "uint16"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_AFIC_TOKEN",
                    "type": "uint256"
                }
            ],
            "name": "Staked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint32",
                    "name": "_orderId",
                    "type": "uint32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_AFIC_TOKEN",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_RREWARD_TOKEN",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawed",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "AFIC_TOKEN",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "RREWARD_TOKEN",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "adminRewardWithdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_orderId",
                    "type": "uint32"
                }
            ],
            "name": "claim",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claimAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint16",
                    "name": "",
                    "type": "uint16"
                }
            ],
            "name": "dayToApy",
            "outputs": [
                {
                    "internalType": "uint16",
                    "name": "",
                    "type": "uint16"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getApys",
            "outputs": [
                {
                    "internalType": "uint16[4]",
                    "name": "",
                    "type": "uint16[4]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPoolAllList",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint16",
                            "name": "stakedDays",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint32",
                            "name": "orderId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint32",
                            "name": "apy",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startingTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stakedAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "hadRewardAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardPerSecondToken",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ManagerPoolAFIC.UserStakingInfo[]",
                    "name": "orderList",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPoolStakedTokenBlanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRemainingReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserCurrentAllStakingOrder",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint16",
                            "name": "stakedDays",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint32",
                            "name": "orderId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint32",
                            "name": "apy",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "startingTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stakedAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "hadRewardAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardPerSecondToken",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ManagerPoolAFIC.UserStakingInfo[]",
                    "name": "orderList",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserStakingTotalInfo",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "stakedAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "hadRewardAmount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct ManagerPoolAFIC.UserStakingTotalInfo",
                    "name": "TotalInfo",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "poolList",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint16",
                    "name": "stakedDays",
                    "type": "uint16"
                },
                {
                    "internalType": "uint32",
                    "name": "orderId",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "apy",
                    "type": "uint32"
                },
                {
                    "internalType": "uint256",
                    "name": "startingTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "endTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stakedAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "rewardAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "hadRewardAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "rewardPerSecondToken",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint16[4]",
                    "name": "_apys",
                    "type": "uint16[4]"
                }
            ],
            "name": "setApys",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint16",
                    "name": "_days",
                    "type": "uint16"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "stakingApys",
            "outputs": [
                {
                    "internalType": "uint16",
                    "name": "",
                    "type": "uint16"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_orderId",
                    "type": "uint32"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}
export default stakingReward_data;


