# SimpleTransferDapp

**SimpleTransferDapp** is my first Web3 application. It allows users to connect their MetaMask wallet, view their ETH balance, deposit funds, transfer ETH to other accounts, and withdraw.  
Built with React.js, Solidity, Hardhat, Tailwind CSS, and Ethers.js.

> ⚠️ Note: This is my first Web3 app — there might be some errors and plenty of room for improvement. Feedback and suggestions are welcome!

---

## 🚀 Features

- 🔐 Connect your MetaMask wallet
- 💰 View wallet ETH balance
- 📥 Deposit ETH into your account
- 🔄 Transfer ETH to different wallets
- 📤 Withdraw ETH from the DApp

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Smart Contracts:** Solidity, Hardhat
- **Library:** Ethers.js
- **Wallet Integration:** MetaMask
- **Network:** Hardhat local network and Sepolia testnet via Infura

---

## 📸 Demo

_Coming soon_ — Screenshot will be added after styling is complete.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn
- [MetaMask](https://metamask.io/) browser extension
- [Infura](https://infura.io/) account and project for Sepolia RPC access

---

### Clone the repository

```bash
git clone https://github.com/riteshkrkarn/simpleTransferDapp.git
cd simpleTransferDapp
```

## 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

## 🛠️ Compile Smart Contracts

```bash
npx hardhat compile
```

## 🚀 Deploy Smart Contracts

### To Local Hardhat Network

```bash
npx hardhat node
```

Then in a separate terminal, deploy the contract:

```bash
npx hardhat ignition deploy ./ignition/modules/simpleTransfer.js --network localhost
```

📌 You can find your deployment modules inside the deployments/ directory.

## 💻 Start the Frontend

```bash
npm run dev
# or
yarn dev
```

## 🧪 Testing

To run tests:

```bash
npx hardhat test
```

---

## 🙋‍♂️ Author

**Ritesh Kumar Karn**

- GitHub: [@riteshkrkarn](https://github.com/riteshkrkarn)
- Email: [riteshkumarkarn414@gmail.com](mailto:riteshkumarkarn414@gmail.com)

---

## 📝 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute with attribution.
