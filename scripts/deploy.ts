import hre from 'hardhat';
import { deployContract, deployProxy } from '../test/utils/helpers';
import { Factory, NFT } from '../typechain-types';

async function main() {
  let currentTime = Math.ceil(new Date().getTime() / 1000);
  let oneDayTime = 24 * 60 * 60;

  let baseURI = 'https://ipfs.io/ipfs/bafybeigifi354nvtcmtilhm7n7ww6euuhymcin3knmq36cmhzd477frzy4/exported_metadata/';
  let eventStartTime = currentTime - 10000;
  let eventEndTime = currentTime + 10 * oneDayTime;

  // deployProxy NFT smart contract 
  const NFT: NFT = await deployContract('NFT', [], undefined);

  // Verify the NFT smart contract 
  await hre.run('verify:verify', {
    address: NFT.address,
    contract: 'contracts/NFT.sol:NFT',
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
