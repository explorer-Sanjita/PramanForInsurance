async function main() {
    
    // Grab the contract factory 
    const Loyalty = await ethers.getContractFactory("InsuranceContract");
 
    // Start deployment, returning a promise that resolves to a contract object
    const KMONS = await Loyalty.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", KMONS.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });