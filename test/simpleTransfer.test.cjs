const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleTransfer", function () {
  let simpleTransfer;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy the contract
    const SimpleTransfer = await ethers.getContractFactory("SimpleTransfer");
    simpleTransfer = await SimpleTransfer.deploy();
    await simpleTransfer.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deposits", function () {
    it("Should allow deposits and update balances", async function () {
      const depositAmount = ethers.parseEther("1.0");

      await simpleTransfer.deposit({ value: depositAmount });

      expect(await simpleTransfer.balances(owner.address)).to.equal(
        depositAmount
      );

      await expect(simpleTransfer.deposit({ value: depositAmount }))
        .to.emit(simpleTransfer, "Deposit")
        .withArgs(owner.address, depositAmount);
    });
  });

  describe("Transfers", function () {
    it("Should transfer funds correctly", async function () {
      const transferAmount = ethers.parseEther("0.5");

      // Make a transfer
      await simpleTransfer.transfer(addr1.address, { value: transferAmount });

      // Check balances
      expect(await simpleTransfer.balances(addr1.address)).to.equal(
        transferAmount
      );

      // Check the event was emitted
      await expect(
        simpleTransfer.transfer(addr1.address, { value: transferAmount })
      )
        .to.emit(simpleTransfer, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });

    it("Should fail if amount is zero", async function () {
      await expect(
        simpleTransfer.transfer(addr1.address, { value: 0 })
      ).to.be.revertedWith("Amount must be greater than zero");
    });

    it("Should fail if recipient is the zero address", async function () {
      await expect(
        simpleTransfer.transfer(ethers.ZeroAddress, {
          value: ethers.parseEther("0.1"),
        })
      ).to.be.revertedWith("Invalid recipient address");
    });
  });

  describe("Withdrawals", function () {
    it("Should allow withdrawals if balance is sufficient", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("0.5");

      // First deposit some funds
      await simpleTransfer.deposit({ value: depositAmount });

      // Get balance before withdrawal
      const balanceBefore = await ethers.provider.getBalance(owner.address);

      // Withdraw half the amount
      const tx = await simpleTransfer.withdraw(withdrawAmount);
      const receipt = await tx.wait();
      const gasUsed = BigInt(receipt.gasUsed) * BigInt(tx.gasPrice);

      // Check contract balance was updated
      expect(await simpleTransfer.balances(owner.address)).to.equal(
        depositAmount - withdrawAmount
      );

      // Check owner received the funds (accounting for gas costs)
      const balanceAfter = await ethers.provider.getBalance(owner.address);
      expect(balanceAfter).to.equal(balanceBefore - gasUsed + withdrawAmount);
    });

    it("Should fail if withdrawal amount exceeds balance", async function () {
      const depositAmount = ethers.parseEther("0.5");
      const withdrawAmount = ethers.parseEther("1.0");

      // Deposit some funds
      await simpleTransfer.deposit({ value: depositAmount });

      // Try to withdraw more than the balance
      await expect(simpleTransfer.withdraw(withdrawAmount)).to.be.revertedWith(
        "Insufficient balance"
      );
    });
  });
});
