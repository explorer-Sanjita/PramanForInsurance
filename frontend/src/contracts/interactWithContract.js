import Web3 from 'web3';  // Import the Web3 library
import { contract,contractABI,contractAddress } from './Campaign';   // Replace with your contract's ABI
// Configure Web3 to connect to the local Ganache node
// const web3 = new Web3(window.ethereum);  // Update the URL if necessary
const metamaskWeb3 = new Web3(window.ethereum); // Metamask-injected web3

// Use metamaskWeb3 to interact with contracts and sign transactions
const contractInstance = new metamaskWeb3.eth.Contract(contractABI, contractAddress);

// Import your contract's ABI and address

// contractActions.js

export const submitDocument = async (insuranceAddress, clientAddress, ipfsHash) =>{
  try {
    const sender = insuranceAddress;
    try {
      const result = await contractInstance.methods.submitDocument(insuranceAddress,clientAddress,ipfsHash).send({ from: sender });
      console.log('Document Uploaded:', result.events.DocumentGenerated.returnValues);
      const data = result.events.DocumentGenerated.returnValues
      return { success: true, data };
    } catch (error) {
      console.error('Error Document Uploaded:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, error };
  }
}

export const accessDocument = async (insuranceAddress,clientAddress, index, reason) =>{
  try {
    try {
      const result = await contractInstance.methods.accessDocument(insuranceAddress, index, reason).send({ from: clientAddress });
      console.log('Document Access:', result.events);
      return { success: true, result };
    } catch (error) {
      console.error('Error Document Uploaded:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, error };
  }
}

export const getAllDocument = async (insuranceAddress,brokerAddress) =>{
  try {
    try {
      const result = await contractInstance.methods.getAllDocuments(insuranceAddress).call({from : brokerAddress});
      console.log('Document Access:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error Document Uploaded:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, error };
  }
}

export const getAccessControl = async (insuranceAddress,index,clientAddress) =>{
  try {
    try {
      const result = await contractInstance.methods.getAccessControl(insuranceAddress,index,clientAddress).call({from : clientAddress});
      console.log('Document Access:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error Document Uploaded:', error);
      return { success: false, error };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { success: false, error };
  }
}

// export const getAccessControl = async (insuranceAddress, index, clientAddress) =>{
//   try {
//     try {
//       const result = await contractInstance.methods.getAccessControl(insuranceAddress, index, clientAddress).call({from : clientAddress});
//       console.log('Document Access:', result);
//       return { success: true, result };
//     } catch (error) {
//       console.error('Error Document Uploaded:', error);
//       return { success: false, error };
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     return { success: false, error };
//   }
// }

// export const handleRegisterCustomer = async (walletAddress) => {
//   try {
//     const sender = walletAddress;
//     console.log(sender);

//     try {
//       const result = await contractInstance.methods.registerCustomer().send({ from: sender });
//       console.log('Registered as a customer:', result);
//       return { success: true, result };
//     } catch (error) {
//       console.error('Error registering as a customer:', error);
//       return { success: false, error };
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     return { success: false, error };
//   }
// };


// export const handleRegisterSeller = async (walletAddress) => {
//   try {
//     const sender = walletAddress;
//     console.log(sender)
//     try {
//       const result = await contractInstance.methods.registerSeller().send({ from: sender });
//       console.log('Registered as a seller:', result);
//       return { success: true, result };
//     } catch (error) {
//       console.error('Error registering as a seller:', error);
//       return { success: false, error };
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     return { success: false, error };
//   }
// };

// export const handleTransferReward = async (userId,sellerWalletAddress,amount) =>{
//     try {
//       const userResponse = await axios.get(`/api/v1/userDetails/${userId}`); // Replace with the actual API endpoint
//       const userWalletAddress = userResponse.data.user.walletAddress; // Assuming the response contains the seller's ID
//       const result = await contractInstance.methods.transferTokenToBuyer(userWalletAddress,amount).send({ from: sellerWalletAddress });
//       console.log('Reward Succesfully:', result);
//       return { success: true, result };
//     } catch (error) {
//       console.error('Error:', error);
//       return { success: false, error };
//     }
//   }
