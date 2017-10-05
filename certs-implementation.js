var alice = new Client('alice');
var bob = new Client('bob');
var carl = new Client('carl');
var clients = [alice, bob, carl];

function Client (id){
  this.id = id; // id == public key == address
  this.unusedValidTransactions = {}; // blockchain, contains SHAs // todo convert to array?
  this.unvalidatedTransactions = []; // need to validate these.
};

Client.prototype.give = function(clientId, amount) {

  return transaction;

  function arrayify(obj){
    return Object.keys(obj).reduce(function(result, key){
      result.push(obj[key]);
      return result;
    }, []);
  }
};

Client.prototype.broadcastTransaction = function(transaction){

};

Client.prototype.onReceivingTransaction = function(transaction, senderId){

};

Client.prototype.mine = function(){

  return solution;
};

Client.prototype.broadcastSolution = function(solution, transactions){

};

Client.prototype.onReceivingSolution = function(solution, transactions, solverId){

  function verifyAll(transactions){
    return transactions.reduce(function(transactionsValid, transaction){
      return transactionsValid && thisClient.verify(transaction);
    }, true);
  }
  function updateBlockchain(transactions){
    transactions.forEach(function(transaction){
      deleteUsedInputTransactions(transaction) // todo other dest?
      thisClient.unusedValidTransactions[transaction.id] = transaction;
      var i = thisClient.unvalidatedTransactions.indexOf(transaction);
      if(i >= 0){
        thisClient.unvalidatedTransactions.splice(i, 1);
      }
    });
    function deleteUsedInputTransactions(transaction){
      transaction.inputs.forEach(function(inputTransaction){
        delete thisClient.unusedValidTransactions[inputTransaction.id];
      });
    }
  }
};

Client.prototype.balance = function(){

};

Client.prototype.verify = function(transaction){
  return isTransactionValid;
};

Client.prototype.validateSolution = function(solution){
  return solution < 0.2;
};

Client.prototype.generateRewardTransaction = function(solution, id, amount){
  var txn = new Transaction('coinbase', 'reward'+solution); // same SHA for a given solution
  txn.addOutput(id, amount);
  return txn;
};

function Transaction(sender){
  this.sender = sender;
  this.id = 'transfer'+Math.random();
  this.inputs = [];
  this.outputs = [];
}
Transaction.prototype.addInput = function(inputTransaction){ //should be valid and unused
  this.inputs.push(inputTransaction);

};
Transaction.prototype.addOutput = function(publicKey, amount){
  this.outputs.push({amount:amount, destination:publicKey}); // destination can be thisClient

};

Transaction.prototype.outputsValid = function(){
  var outputsSum = this.outputs.reduce(function(sum, output){
    return sum += output.amount;
  }, 0);
  return this.inputsSumToSender(this.sender.id) - outputsSum >= 0;

};
Transaction.prototype.inputsValid = function(unusedValidTransactions){
  var sender = this.sender;

  return this.inputs.reduce(function(isValid, inputTransaction){
    return isValid
    && unusedValidTransactions[inputTransaction.id]
      && inputTransaction.sumToDestination(sender.id) > 0;
  }, true);
};
Transaction.prototype.inputsSumToSender = function(clientId){
  return this.inputs.reduce(function(sum, inputTransaction){
    return sum += inputTransaction.sumToDestination(clientId);
  }, 0);
};
Transaction.prototype.sumToDestination = function(clientId){
  return this.outputs.reduce(function(sum, output){
    return sum += output.destination === clientId ? output.amount : 0;
  }, 0);
};
