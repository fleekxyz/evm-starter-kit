// SPDX-License-Identifier: MIT
// The line above is recommended and let you define the license of your contract
// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// This is the main building block for smart contracts.
contract Token {
  // Some string type variables to identify the token.
  // The `public` modifier makes a variable readable from outside the contract.
  string public name = "My Hardhat Token";
  string public symbol = "MBT";

  // The fixed amount of tokens stored in an unsigned integer type variable.
  uint256 public totalSupply = 1000000;

  // An address type variable is used to store ethereum accounts.
  address public owner;

  // A mapping is a key/value map. Here we store each account balance.
  mapping(address => uint256) balances;
  mapping(address => mapping(address => uint)) public allowance;

  event Transfer(address indexed _from, address indexed _to, uint _value);

  constructor(address _owner) {
    // The totalSupply is assigned to transaction sender, which is the account
    // that is deploying the contract.
    balances[_owner] = totalSupply;
    owner = _owner;
  }

  function transfer(address to, uint256 amount) external {
    // Check if the transaction sender has enough tokens.
    // If `require`'s first argument evaluates to `false` then the
    // transaction will revert.
    require(balances[msg.sender] >= amount, "Not enough tokens");

    // Transfer the amount.
    balances[msg.sender] -= amount;
    balances[to] += amount;

    emit Transfer(msg.sender, to, amount);
  }

  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
}
