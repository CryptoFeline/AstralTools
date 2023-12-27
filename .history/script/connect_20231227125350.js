async function connectWallet() {
    if (window.ethereum) { // Check if MetaMask is installed
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Connected successfully
            console.log("Wallet connected:", accounts[0]); // Assuming we use the first account

            // Create a new Web3 instance
            const web3 = new Web3(window.ethereum);

            // Define the address of the token contract and the wallet address
            const tokenContractAddress = '0xC74B43cC61b627667a608c3F650c2558F88028a1';
            const userAddress = accounts[0];

            // Define the ABI (Application Binary Interface) of the token contract
            const tokenContractABI = [
                // balanceOf function ABI
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "type": "function"
                }];

            // Create contract instance
            const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

            // Call the balanceOf function from the contract
            const balance = await tokenContract.methods.balanceOf(userAddress).call();

            // Assuming the balance is returned as an integer number of tokens
            if (parseInt(balance) > 1) {
                // The user has more than 1 token
                document.getElementById('landingPage').style.display = 'none';
                document.getElementById('imageGenInterface').style.display = 'block';
            } else {
                // The user does not have the required number of tokens - Show error page
                document.getElementById('errorMessage').style.display = 'block';
            }
        } catch (error) {
            // User denied account access or some other error occurred
            console.error("Could not connect to wallet:", error);
        }
    } else {
        // MetaMask is not installed
        alert('Please install MetaMask to use this feature!');
    }
}

// Event listeners
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);