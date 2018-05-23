var fs = require('fs');
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
var BigNumber = require('bignumber.js');

//Provider examples:
//Mainnet - https://mainnet.infura.io/<api-key>
//Rinkeby - https://rinkeby.infura.io/<api-key>
//Local - http://localhost:7545
const web3 = new Web3('https://mainnet.infura.io/<api-key>'); // provider
var abiArray = JSON.parse(fs.readFileSync('EasyOptionToken.json', 'utf-8')); //token contract ABI
const privateKey = <private key>;
const contractAddress = <EOPT contract address>;
var myAddress = <sender address>; 
const chainId = 0x04; //local or mainnet 0x01, ropsten 0x03, rinkeby 0x04

//send EOPT to target address
async function sender( enonce, destAddress, ammo) { 	

  var transferAmount = new BigNumber(ammo * 1000000000000000000);
  console.log(`transfer ammo: ${transferAmount}`);
 
  let count = 0; 
  let balance = 0; 
  
  count = await web3.eth.getTransactionCount(myAddress);  //my transactions count
  console.log(`num transactions so far: ${count}`);
 
  count = count + enonce;

  //get contract
  var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

  balance = await contract.methods.balanceOf(myAddress).call(); //my balance
  console.log(`Balance before send: ${balance}`);

  var rawTransaction = {
      "from": myAddress,
      "nonce": "0x" + count.toString(16),
      "gasPrice": "0x003b9aca00",
      "gasLimit": "0x0A000",
      "to": contractAddress,
      "value": "0x0",
      "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
      "chainId": chainId
  };

  var privKey = new Buffer(privateKey, 'hex');
  var tx = new Tx(rawTransaction);
  tx.sign(privKey); //sign with my private key
  var serializedTx = tx.serialize();

  console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
  var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  logger.debug(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
  //console.log('Complete - ${destAddress} ${transferAmount}');
}

var log4js = require('log4js');
log4js.configure({
  appenders: { trans: { type: 'file', filename: 'logs/trans.log' } },
  categories: { default: { appenders: ['trans'], level: 'debug' } }
});
 
const logger = log4js.getLogger('trans');

//example of sending EOPT:

// sender(0, 'address0', amount0 );
// sender(1, 'address1', amount1 );
// sender(2, 'address2', amount2 );
// .
// .
// .
// sender(n, 'addressn', amountn );
