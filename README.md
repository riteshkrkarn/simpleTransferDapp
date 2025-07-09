# Simple Transfer Dapp 🚀

**Simple Transfer Dapp** is a decentralized Ethereum application that demonstrates fundamental Web3 interactions. This DApp allows users to connect their MetaMask wallet and perform essential blockchain operations including deposits, transfers, balance checks, and withdrawals through a smart contract deployed on the Ethereum blockchain.

Built as a learning project to understand Web3 development fundamentals using modern technologies like React.js, Solidity, Hardhat, Tailwind CSS, and Ethers.js.

> ⚠️ **Learning Project Notice:** This is my first Web3 application created for educational purposes and portfolio demonstration. While fully functional, there might be areas for optimization and improvement. Feedback and suggestions are welcome!

---

## 🎯 What This DApp Does

SimpleTransferDapp provides a user-friendly interface for interacting with the Ethereum blockchain through a custom smart contract. Users can:

- **Connect Wallet:** Seamlessly connect MetaMask to interact with the DApp
- **View Balances:** Check ETH balance of any valid Ethereum address
- **Deposit Funds:** Add ETH to your account balance within the smart contract
- **Transfer ETH:** Send ETH directly to other Ethereum addresses
- **Withdraw Funds:** Retrieve your deposited ETH back to your wallet

---

## 🏗️ Architecture & Smart Contract

### Smart Contract: `SimpleTransfer.sol`

The core smart contract provides four main functions:

```solidity
// Deposit ETH into the contract
function deposit() external payable

// Transfer ETH to another address
function transfer(address payable recipient) public payable

// Withdraw ETH from your contract balance
function withdraw(uint amount) external

// Check balance of any address
function getBalance(address account) external view returns (uint256)
```

**Key Features:**

- Maintains internal balance mapping for each user
- Emits events for deposit and transfer operations
- Implements safety checks and error handling
- Uses `call()` for secure ETH transfers

---

## 🛠 Tech Stack

| Component                  | Technology            |
| -------------------------- | --------------------- |
| **Frontend Framework**     | React.js with Vite    |
| **Styling**                | Tailwind CSS          |
| **Smart Contracts**        | Solidity ^0.8.0       |
| **Development Framework**  | Hardhat               |
| **Blockchain Interaction** | Ethers.js             |
| **Wallet Integration**     | MetaMask              |
| **Testing Network**        | Hardhat Local Network |

---

## 📸 Application Interface

![SimpleTransferDapp Interface](https://github.com/riteshkrkarn/simpleTransferDapp/blob/main/demo-screenshot.png)

The interface features:

- **Connected Account Display:** Shows current wallet address and balance
- **Deposit Section:** Input field for depositing ETH
- **Transfer Section:** Recipient address and amount inputs for transfers
- **Withdraw Section:** Amount input for withdrawing funds
- **Modern UI:** Dark theme with gradient background and glassmorphism effects

---

## 📁 Project Structure

```
simpleTransferDapp/
├── 📁 contracts/
│   └── simpleTransfer.sol          # Smart contract
├── 📁 ignition/
│   └── modules/                    # Deployment scripts
├── 📁 src/                         # Frontend React application
├── 📁 test/                        # Smart contract tests
├── 📁 public/                      # Static assets
├── 📁 artifacts/                   # Compiled contracts
├── 📁 cache/                       # Hardhat cache
├── 📁 node_modules/                # Dependencies
├── .env                            # Environment variables
├── hardhat.config.js               # Hardhat configuration
├── package.json                    # Project dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

---

## 🎮 User Workflow

1. **Launch Application:** Open the DApp in your browser
2. **Connect Wallet:** Click connect to link your MetaMask wallet
3. **View Balance:** See your current ETH balance displayed
4. **Deposit ETH:** Enter amount and deposit funds into the contract
5. **Transfer ETH:** Send ETH to any valid Ethereum address
6. **Check Balances:** Query balance of any Ethereum address
7. **Withdraw Funds:** Retrieve your deposited ETH back to your wallet

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn
- [MetaMask](https://metamask.io/) browser extension
- [Infura](https://infura.io/) account and project for RPC access (optional)

---

### 1. Clone the Repository

```bash
git clone https://github.com/riteshkrkarn/simpleTransferDapp.git
cd simpleTransferDapp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_INFURA_API_KEY=your_infura_api_key_here
```

> **Note:** The Infura API key is optional since this project primarily runs on Hardhat local network.

### 4. Compile Smart Contracts

```bash
npx hardhat compile
```

### 5. Deploy Smart Contracts

#### Deploy to Local Hardhat Network

Start the local Hardhat network:

```bash
npx hardhat node
```

In a separate terminal, deploy the contract:

```bash
npx hardhat ignition deploy ./ignition/modules/simpleTransfer.js --network localhost
```

📌 **Important:** After deployment, note the contract address. You'll need to update your frontend configuration with this address.

You can find your deployment details in the `ignition/deployments/` directory.

### 6. Start the Frontend

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

---

## 🔧 MetaMask Configuration

### Adding Hardhat Local Network

1. Open MetaMask
2. Click on the network dropdown
3. Select "Add Network" → "Add a network manually"
4. Enter the following details:
   - **Network Name:** Hardhat Local
   - **New RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH

### Import Test Accounts

Hardhat provides test accounts with pre-funded ETH. Import any of the private keys shown when you run `npx hardhat node` into MetaMask for testing.

---

## 🧪 Testing

Run the smart contract tests:

```bash
npx hardhat test
```

---

## 🚀 Smart Contract Functions

### `deposit()`

- **Purpose:** Deposit ETH into your contract balance
- **Parameters:** None (ETH sent with transaction)
- **Events:** Emits `Deposit(address to, uint256 amount)`

### `transfer(address payable recipient)`

- **Purpose:** Transfer ETH to another address
- **Parameters:** `recipient` - Target Ethereum address
- **Requirements:** Amount > 0, valid recipient address
- **Events:** Emits `Transfer(address from, address to, uint256 amount)`

### `withdraw(uint amount)`

- **Purpose:** Withdraw ETH from your contract balance
- **Parameters:** `amount` - Amount to withdraw in wei
- **Requirements:** Sufficient balance
- **Security:** Uses `call()` for safe ETH transfers

### `getBalance(address account)`

- **Purpose:** Check balance of any Ethereum address
- **Parameters:** `account` - Address to check
- **Returns:** Balance in wei
- **View Function:** Read-only, no gas cost

---

## 💡 Learning Outcomes

This project demonstrates:

- **Smart Contract Development:** Writing secure Solidity contracts
- **Frontend Integration:** Connecting React with Web3
- **Wallet Integration:** MetaMask connection and interaction
- **Event Handling:** Listening to contract events
- **Error Handling:** Proper error management in DApps
- **Modern UI/UX:** Responsive design with Tailwind CSS

---

## 🔮 Future Enhancements

Potential improvements for this learning project:

- [ ] Add transaction history and receipts
- [ ] Implement gas fee estimation
- [ ] Add support for ERC-20 tokens
- [ ] Deploy to testnets (Sepolia, Goerli)
- [ ] Add comprehensive unit tests
- [ ] Implement loading states and better UX
- [ ] Add transaction confirmation modals

---

## 🙋‍♂️ Author

**Ritesh Kumar Karn**

- GitHub: [@riteshkrkarn](https://github.com/riteshkrkarn)
- Email: [riteshkumarkarn414@gmail.com](mailto:riteshkumarkarn414@gmail.com)

---

## 📝 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute with attribution.
