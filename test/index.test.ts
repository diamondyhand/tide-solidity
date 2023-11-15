import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, assert } from 'chai';
import { BigNumber } from 'ethers';

import {
  NFT
} from '../typechain-types';
import { deployContract, toWei } from './utils/helpers';

describe('Tide nft contract unit test', () => {
  let owner: SignerWithAddress;
  let bobby: SignerWithAddress;
  let alice: SignerWithAddress;

  let nft: NFT;

  let currentTime = Math.ceil(new Date().getTime() / 1000);
  let oneDayTime = 24 * 60 * 60;
  let baseURI = 'ipfs://QmSATVLXwpcCreYfzYxLzGUSqJYSFA8jthSMZ6rjxWWAzD/';

  beforeEach(async () => {
    [owner, bobby, alice] = await ethers.getSigners();
    nft = await deployContract('NFT', [], undefined);
  });

  describe('mint Function Unit test', async () => {
    it('should be owner for minting nft', async function () {
      await nft.mint(bobby.address);
      const tokenURI = await nft.tokenURI(0);
      assert.equal(baseURI + '0', tokenURI);
    });

    it('should revert when users mint the nft', async function () {
      await expect(
        nft.connect(bobby).mint(alice.address)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    });

  });

  describe('tokenURI Function Unit test', async () => {
    it('should be check with baseURI', async function () {
      await nft.mint(bobby.address);
      await nft.setBaseURI(baseURI);
      const currentTokenURI = baseURI + '0';
      expect(
        await nft.tokenURI(0)
      ).to.equal(currentTokenURI);
    });
  });
});
