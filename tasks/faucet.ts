import { HardhatEthersHelpers } from "hardhat-deploy-ethers/types";
import path from "path";
import fs from "fs";

async function faucetTo(receiver: string, ethers: HardhatEthersHelpers) {
  const addressesFile = path.join(
    __dirname + "/../frontend/src/contracts/contracts.json");

  if (!fs.existsSync(addressesFile)) {
    console.error("You need to deploy your contract first");
    return;
  }

  const addressJson = fs.readFileSync(addressesFile);
  const tokenAddress = JSON.parse(addressJson.toString()).contracts.Token.address;

  if (tokenAddress === "0x") {
    console.error("You need to deploy your contract first");
    return;
  }

  const token = await ethers.getContractAt("Token", tokenAddress);

  const [_, tokenOwner] = await ethers.getSigners();

  const tx = await token.connect(tokenOwner).transfer(receiver, 50);
  await tx.wait();


  const tx2 = await tokenOwner.sendTransaction({
    to: receiver,
    value: ethers.constants.WeiPerEther,
  });
  await tx2.wait();

  console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`);
};

export default faucetTo;
