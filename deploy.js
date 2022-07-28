const path= require('path');
const fs = require('fs-extra');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = 'organ together afford across cube man health december impulse soon hobby child'; 
const providerOrUrl = 'wss://rinkeby.infura.io/ws/v3/e3f88a953e12463daf67f45e123f64e0';

const provider = new HDWalletProvider( mnemonic, providerOrUrl );
const web3 = new Web3(provider);

const dataPath = path.resolve(__dirname,'contractsBuild','NFTCreation.json');
const data = fs.readFileSync(dataPath, 'utf8');

deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const abi = JSON.parse(data).abi;
  const bytecode = JSON.parse(data).evm.bytecode.object;
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({from: accounts[0], gas: 10000000 });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();