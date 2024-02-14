import Web3 from 'web3';
import Insurance from "../artifacts/contracts/insurance.sol/InsuranceContract.json";
const testnet = process.env.TESTNET;
const web3 = new Web3(
    `http://127.0.0.1:8545/`
);export const contractAddress = "0x461DD113fc774916C52Dfa9f025D896244e3D715";
export const contractABI = Insurance.abi; //
export const contract = new web3.eth.Contract(contractABI, contractAddress);