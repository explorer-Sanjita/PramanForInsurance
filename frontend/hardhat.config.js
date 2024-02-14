/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.8.19",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: "https://rpc-mumbai.maticvigil.com",
         accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
   },
}