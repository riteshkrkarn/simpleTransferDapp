import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import contractArtifact from "./../artifacts/contracts/simpleTransfer.sol/SimpleTransfer.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          // Create a provider and signer
          const provider = new ethers.BrowserProvider(window.ethereum);

          // Log network information to debug
          const network = await provider.getNetwork();
          console.log("Connected network:", {
            chainId: network.chainId.toString(),
            name: network.name,
          });

          const signer = await provider.getSigner();

          // Verify contract ABI before creating instance
          console.log("Contract ABI:", contractArtifact.abi);

          // Create contract instance using the imported ABI
          const simpleTransfer = new ethers.Contract(
            contractAddress,
            contractArtifact.abi,
            signer
          );

          // Log available functions from the contract interface
          console.log(
            "Available contract functions:",
            Object.keys(simpleTransfer.interface.fragments)
              .filter(
                (key) =>
                  simpleTransfer.interface.fragments[key].type === "function"
              )
              .map((key) => simpleTransfer.interface.fragments[key].name)
          );

          setContract(simpleTransfer);

          // Check if the contract has been deployed correctly
          try {
            // Try to get the actual contract code from the blockchain
            const code = await provider.getCode(contractAddress);
            if (code === "0x" || code === "0x0") {
              setError(
                `No contract found at address ${contractAddress}. Make sure your contract is deployed.`
              );
            } else {
              console.log("Contract code exists at address.");

              // Use a simpler verification - check if we can access the contract ABI methods
              if (simpleTransfer.getBalance) {
                console.log(
                  "Contract interface verified, getBalance method exists"
                );
              }
            }
          } catch (contractError) {
            console.error("Contract verification failed:", contractError);
          }

          // Try to get balance safely
          try {
            const balance = await simpleTransfer.getBalance(accounts[0]);
            setBalance(ethers.formatEther(balance));
          } catch (balanceError) {
            console.error("Error getting contract balance:", balanceError);

            // Try to get account balance from the provider as fallback
            try {
              const ethBalance = await provider.getBalance(accounts[0]);
              setBalance(ethers.formatEther(ethBalance));
              console.log(
                "Using ETH balance instead:",
                ethers.formatEther(ethBalance)
              );
            } catch (err) {
              console.error("Error getting ETH balance:", err);
            }
          }

          // Set up event listener for account changes
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
            updateBalance(accounts[0], simpleTransfer);
          });
        } catch (error) {
          console.error("Error initializing app:", error);
          setError(
            "Failed to connect to wallet. Please make sure MetaMask is installed and unlocked."
          );
        }
      } else {
        setError("Ethereum wallet not detected. Please install MetaMask.");
      }
    };

    init();

    return () => {
      // Clean up event listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, [contractAddress]);

  const updateBalance = async (address, contractInstance) => {
    try {
      // First try the contract's getBalance function
      const balance = await contractInstance.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching contract balance:", error);

      // Fallback to getting the ETH balance from provider
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const ethBalance = await provider.getBalance(address);
        setBalance(ethers.formatEther(ethBalance));
      } catch (fallbackError) {
        console.error("Error fetching ETH balance:", fallbackError);
      }
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTxHash("");

    try {
      if (!depositAmount || parseFloat(depositAmount) <= 0) {
        throw new Error("Please enter a valid deposit amount");
      }

      const tx = await contract.deposit({
        value: ethers.parseEther(depositAmount),
      });

      setTxHash(tx.hash);
      await tx.wait();

      // Update balance
      await updateBalance(account, contract);
      setDepositAmount("");
    } catch (error) {
      console.error("Deposit error:", error);
      setError(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTxHash("");

    try {
      if (!ethers.isAddress(recipientAddress)) {
        throw new Error("Please enter a valid Ethereum address");
      }

      if (!transferAmount || parseFloat(transferAmount) <= 0) {
        throw new Error("Please enter a valid transfer amount");
      }

      const tx = await contract.transfer(recipientAddress, {
        value: ethers.parseEther(transferAmount),
      });

      setTxHash(tx.hash);
      await tx.wait();

      // Update balance
      await updateBalance(account, contract);
      setTransferAmount("");
      setRecipientAddress("");
    } catch (error) {
      console.error("Transfer error:", error);
      setError(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTxHash("");

    try {
      if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
        throw new Error("Please enter a valid withdrawal amount");
      }

      const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));

      setTxHash(tx.hash);
      await tx.wait();

      // Update balance
      await updateBalance(account, contract);
      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdrawal error:", error);
      setError(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-[32rem] w-[28rem] m-auto flex flex-col items-start justify-evenly border-4 p-6">
        <h1 className="text-center font-bold text-xl underline p-2 w-full">
          Simple Transfer App
        </h1>
        <div className="h-3/25 flex flex-col justify-between w-full mb-4">
          <p className="font-medium">
            Connected Account: <span className="font-normal">{account}</span>
          </p>
          <p className="font-medium">
            Balance: <span className="font-normal">{balance} ETH</span>
          </p>
        </div>
        <form onSubmit={handleDeposit} className="w-full flex gap-2 mb-2">
          <input
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Deposit Amount"
            className="border p-1 flex-1"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-1 px-2 border rounded-2xl cursor-pointer"
          >
            Deposit
          </button>
        </form>
        <form
          onSubmit={handleTransfer}
          className="w-full flex flex-col gap-2 mb-2"
        >
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Recipient Address"
            className="border p-1 w-[312px] mb-2"
          />
          <div className="w-full flex gap-2">
            <input
              type="text"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Transfer Amount"
              className="border p-1 flex-1"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-1 px-2 border rounded-2xl cursor-pointer"
            >
              Transfer
            </button>
          </div>
        </form>
        <form onSubmit={handleWithdraw} className="w-full flex gap-2">
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Withdraw Amount"
            className="border p-1 flex-1"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-1 px-2 border rounded-2xl cursor-pointer"
          >
            Withdraw
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {txHash && <p>Transaction Hash: {txHash}</p>}
      </div>
    </div>
  );
};

export default App;
