import { expect } from "./chai-setup";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from 'hardhat';

describe("Token contract", function() {
   async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("Token");
    const [tokenOwner, _, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    const hardhatToken = await Token.deploy(tokenOwner.address);


    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, tokenOwner, addr1, addr2 };
  }

  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { hardhatToken, tokenOwner } = await loadFixture(deployTokenFixture);

      // Expect receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the tokenOwner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await hardhatToken.owner()).to.equal(tokenOwner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, tokenOwner } = await loadFixture(deployTokenFixture);

      const ownerBalance = await hardhatToken.balanceOf(tokenOwner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, tokenOwner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      // Transfer 50 tokens from owner to addr1
      await expect(() => hardhatToken.connect(tokenOwner).transfer(addr1.address, 50))
      .to.changeTokenBalances(hardhatToken, [tokenOwner, addr1], [-50, 50]);

      // Transfer 50 tokens from addr1 to addr2
      await expect(() => hardhatToken.connect(addr1).transfer(addr2.address, 50))
      .to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);

    });

    it("should emit Transfer events", async function () {
      const { hardhatToken, tokenOwner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      // Transfer 50 tokens from owner to addr1
      await expect(hardhatToken.transfer(addr1.address, 50))
      .to.emit(hardhatToken, "Transfer").withArgs(tokenOwner.address, addr1.address, 50)

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
      .to.emit(hardhatToken, "Transfer").withArgs(addr1.address, addr2.address, 50)
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, tokenOwner, addr1 } = await loadFixture(deployTokenFixture);

      const initialOwnerBalance = await hardhatToken.balanceOf(
        tokenOwner.address
      );
      
      // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.connect(addr1).transfer(tokenOwner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
     
      // Owner balance shouldn't have changed.
      expect(
        await hardhatToken.balanceOf(tokenOwner.address)
      ).to.eq(
        initialOwnerBalance
      );
    });
  });
});

