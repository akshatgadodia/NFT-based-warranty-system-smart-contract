const path= require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'contractsBuild');

fs.removeSync(buildPath);
const contractPath = path.resolve(__dirname, 'SmartContracts','MergedContract','SmartContract.sol');

const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'SmartContract.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for(let contract in output.contracts['SmartContract.sol']){
  fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':','') + '.json'),
      output.contracts['SmartContract.sol'][contract]
  );
}

