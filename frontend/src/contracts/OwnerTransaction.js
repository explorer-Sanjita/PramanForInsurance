import Web3 from 'web3';
import { contractABI, contractAddress } from './Campaign';

// Scenario 2: Using a Local Web3 Instance
const localWeb3 = new Web3( new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/d153b2e5cf904eca89d03c9be7038fb7'));

// Use localWeb3 to interact with contracts
const contractInstanceLocal = new localWeb3.eth.Contract(contractABI, contractAddress);
const senderKey = "0x237149564bafFa073b924963e5D79EDD59C16b70"
export const sendTransaction = async (data) => {
  const nonce = await localWeb3.eth.getTransactionCount(senderKey);
  const gasPrice = await localWeb3.eth.getGasPrice();
  const gasLimit = 3000000; // Adjust as needed

  const tx = {
    nonce,
    from: senderKey,
    to: contractAddress,
    gasPrice,
    gasLimit,
    data,
  };
  console.log(nonce)
  const signedTx = await localWeb3.eth.accounts.signTransaction(tx, '776c32967c4710038bb36f177640aef697f68b63e70a10147c2d9954401b4968');
  try {
    const receipt = await localWeb3.eth.sendSignedTransaction(signedTx.rawTransaction);
    const events = await contractInstanceLocal.getPastEvents('allEvents', {
        fromBlock: receipt.blockNumber,
        toBlock: receipt.blockNumber,
      });

      console.log('Emitted events:', events);
    } catch (error) {
    console.error('Transaction error:', error);
  }
};

export const setAccessControl = async (insuranceAddress,clientAddress,index,hasAccess) => {
  const data = contractInstanceLocal.methods.setAccessControl(insuranceAddress,index,clientAddress,hasAccess).encodeABI();
  await sendTransaction(data);
  return true
};


export const revokeAccessControl = async (clientAddress,insuranceAddress) => {
  const data = contractInstanceLocal.methods.revokeAccess(clientAddress,insuranceAddress).encodeABI();
  await sendTransaction(data);
};
// export const getAccessControl = async (insuranceAddress, index, clientAddress) => {
//   const data = await contractInstanceLocal.methods.getAccessControl(insuranceAddress, index, clientAddress).call({from : clientAddress});
//   console.log("Balance :" + data)
// };