import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';
import * as dotenv from 'dotenv';
dotenv.config();

const ARBITRUM_MAINNET_RPC_URL = process.env.ARBITRUM_MAINNET_RPC_URL

const config: HardhatUserConfig = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    arbitrum: {
      url: 'https://arb1.arbitrum.io/rpc',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },

    binance: {
      url: 'https://bsc-dataseed.binance.org/',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      url: 'https://polygon.llamarpc.com',
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    hardhat: {
      forking: {
        url: 'https://arb1.arbitrum.io/rpc'
      },
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
  },
  etherscan: {
    apiKey: {
      arbitrumOne: `${process.env.ARBISCAN_API_KEY}`,
      arbitrumGoerli: `${process.env.ARBISCAN_API_KEY}`,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      // {
      //   version: '0.8.9',
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200,
      //     },
      //   },
      // },
    ],
  },
};

export default config;
