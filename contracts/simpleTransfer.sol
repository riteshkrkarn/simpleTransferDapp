pragma solidity ^0.8.0;
// SPDX-License-Identifier: UNLICENSED

contract SimpleTransfer {

    event Deposit(address to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address payable recipient) public payable {
        require(msg.value > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");

        unchecked {
            balances[msg.sender] -= msg.value;
            balances[recipient] += msg.value;
            recipient.transfer(msg.value);
        }
        emit Transfer(msg.sender, recipient, msg.value);
    }

    function withdraw (uint amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;

        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
