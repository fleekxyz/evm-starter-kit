import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

import faucet from "./tasks/faucet";

task("faucet", "Add funds to selected address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async (args, { ethers }) => {
    const receiver = String(args.receiver)
    await faucet(receiver, ethers);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
    addr1: 2,
    addr2: 3,
  },
};

export default config;
