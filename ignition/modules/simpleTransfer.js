// ignition/modules/simpleTransfer.js
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimpleTransferModule", (m) => {
  // Deploy the SimpleTransfer contract
  const simpleTransfer = m.contract("SimpleTransfer");

  // You can add future or additional deployments here that might depend on SimpleTransfer
  // For example, if you have another contract that needs SimpleTransfer's address:
  // const anotherContract = m.contract("AnotherContract", [simpleTransfer.address]);

  // Optional: You can define additional deployment steps
  // For example, we could deposit some initial funds
  /*
  m.afterDeploy(async (deployments) => {
    const simpleTransferContract = deployments.SimpleTransfer;
    await simpleTransferContract.deposit({ value: ethers.utils.parseEther("1") });
    console.log("Initial deposit made to SimpleTransfer");
  });
  */

  // Return all the deployed contracts so they can be accessed in other modules or scripts
  return {
    simpleTransfer,
  };
});
