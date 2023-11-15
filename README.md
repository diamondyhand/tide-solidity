
# 🚩 Tide NFT Smart Contract


## Description
This is a Tide Test NFT project that Mint an NFT only if the user has done a Tx in the last day on Uniswap.

### Tech Stack

  - Solidity:         v0.8.18
  - TypeScript:       v4.7.4
  - Hardhat:          v2.10.2
  - Solidity-coverage v0.7.21
  - Format & Lint - ESLint & Prettier
  - Git Hooks: pre-commit
  
### Project setup
```
npm install
```

### Project compile
```
npm run compile
```

### Project clean
```
npm run clean
```

### Project test
```
npm test
```
  
### Project coverage
```
npm run coverage
```
  
### SC deploy
```
npx hardhat run scripts/deploy.ts
npx hardhat run scripts/deploy.ts --network arbitrumGoerli
npx hardhat run scripts/deploy.ts --network arbitrum
```
