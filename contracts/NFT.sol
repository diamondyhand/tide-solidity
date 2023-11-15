// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';

/// @title A Tide NFT using ERC721
/// @author Kevin Tan
/// @notice You can use this contract for mint and transfer NFT.
/// @dev All function calls are currently implemented without side effects
contract NFT is ERC721, Ownable, Pausable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using Strings for uint256;

    string public baseURI;
    CountersUpgradeable.Counter private _tokenIds;

    event TokenMinted(uint256 indexed tokenId, address owner);
    event BaseURIUpdated(string indexed oldValue, string indexed newValue);

    constructor() ERC721('Tide', 'Tide') {}

    /// @notice Owner can only mint their the NFT and transfer NFT to receiver.
    /// @param receiver The address of the user receiving the nft.
    /// @return the new token id
    function mint(address receiver) external onlyOwner whenNotPaused returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(receiver, newItemId);
        emit TokenMinted(newItemId, receiver);
        return newItemId;
    }

    /// @notice Users can burn their nft using this function.
    /// @param tokenId nft id
    function burn(uint256 tokenId) external whenNotPaused {
        require(ownerOf(tokenId) == msg.sender, 'Only owner can burn their nft');
        _burn(tokenId);
    }

    /**
     * @notice Users can get their tokenURI with tokenId.
     * @param tokenId nft id
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(ownerOf(tokenId) != address(0), 'ERC721Metadata: URI query for nonexistent token');
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : '';
    }

    /**
     * @notice Function to set the newBaseURI
     * @param _newBaseURI new base URI
     */
    function setBaseURI(string memory _newBaseURI) external onlyOwner whenNotPaused {
        emit BaseURIUpdated(baseURI, _newBaseURI);
        baseURI = _newBaseURI;
    }
}
