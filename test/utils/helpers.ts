import hre, { ethers, upgrades } from 'hardhat';
import { BigNumber } from 'ethers';
import { expect } from 'chai';
import { DeployProxyOptions } from '@openzeppelin/hardhat-upgrades/dist/utils';

export const deployContract = async <T>(contractName: string, constructorArgs: unknown[], isLog = false) => {
  const contractFactory = await ethers.getContractFactory(contractName);
  const gasPrice = await ethers.provider.getGasPrice();
  const contract = await contractFactory.deploy(...constructorArgs);
  const argStr = constructorArgs.map(i => `"${i}"`).join(' ');
  isLog && console.info(`Deploying ${contractName} ${contract.address} with args: ${argStr}`);
  await contract.deployTransaction.wait();
  isLog && console.info('... Completed!');
  return contract as T;
};

export const deployProxy = async <T>(
  contractName: string,
  constructorArgs: unknown[],
  opt?: DeployProxyOptions,
  isLog = false,
) => {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await upgrades.deployProxy(contractFactory, constructorArgs, opt);
  const argStr = constructorArgs.map(i => `"${i}"`).join(' ');
  isLog && console.info(`Deploying as Proxy ${contractName} ${contract.address} with args: ${argStr}`);
  await contract.deployTransaction.wait();
  isLog && console.info('... Completed!');
  return contract as T;
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const toWei = (amount: string, decimal = 18) => {
  const wei = ethers.utils.parseEther(amount);
  if (decimal === 18) return wei;
  return wei.div(BigNumber.from(10).pow(18 - decimal));
};

export const fromWei = (amount: BigNumber, decimal = 18) => amount.div(BigNumber.from(10).pow(decimal));

export const impersonateAccount = async (address: string) => {
  return await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
};

export const assertDiff = (before: BigNumber, after: BigNumber, expectedDiff: BigNumber) =>
  expect(after.sub(before)).to.equal(expectedDiff);