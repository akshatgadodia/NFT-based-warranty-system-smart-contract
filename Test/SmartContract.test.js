const assert = require('assert');
const path = require('path');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const fs = require('fs');

const dataPath = path.join(__dirname, '..' ,'contractsBuild', 'NFTCreation.json');
const data = fs.readFileSync(dataPath,'utf8');
const abi = JSON.parse(data).abi;
const bytecode = JSON.parse(data).evm.bytecode.object;

let accounts;
let contract;
beforeEach(async () => {
   accounts = await web3.eth.getAccounts();
   contract = await new web3.eth.Contract(abi)
                        .deploy({data:bytecode, arguments : []})
                        .send({from : accounts[0],gas : 10000000});
})

describe('SmartContract',() => {
   it('Deploy Contract',() => {
      assert.ok(contract.options.address);
   })
   it('Contract Name',async () => {
      const data = await contract.methods
                  .name()
                  .call();
      assert.equal("Warranty",data);
   })
   it('Contract Symbol',async () => {
      const data = await contract.methods
                  .symbol()
                  .call();
      assert.equal("WAR",data);
   })
})




