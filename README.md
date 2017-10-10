# deal-coin
Deal is a cryptocurrency

## Component basics

- Wallets
  - A wallet consists of a public/private keypair and an address. The address is derived from the public key.
  
- Transactions
  - A transaction contains inputs, outputs and a unique identifier (called 'hash').
  - An output has a unique identifier and is just an amount and a 'to'-address.
  - An input points to a previous output, and uses the coins from that output. It must contain a compressed public key and a signature. This way nodes can identify that the 'to'-address from the previous output, which can be generated with the public key, is owned by the spender.

- The GUI
  - When you create a transaction, a confirmation is created and both the transaction and the confirmation are shared on the network (UDP broadcast).
  - When using the broadcast option `b`, your dealcoin node will broadcast a request packet on the network. Any dealcoin node receiving the request will send all transactions and confirmations to you. This is so new nodes can 'sync'.

- Network server (UDP)
  - When the server receives a new transaction, it checks if the transaction is valid and adds it to the database ('ledger').
  - When a confirmation is received, the transaction's confirmation is updated if the received difficulty is higher than the existing difficulty.

- Mining and confirmations
  - Confirmations are proof of work hashes for a transaction.
  - The mining component simply creates confirmations for some transaction.
  - Mining is done by hardening the transaction confirmation with the least difficulty.

## Usage

The following steps will allow you to run the code on the local network and spend coins.

#### 1. Run generateGenesis.py

Then you `python generateGenesis.py`. This will show you something like the following:

```
Private key:
    17761749377588078293913083910285222277328633594463995997908039960139540655010
Compressed public key:
    dealmHmF8qgic2re7yECUEtg1147v8FDycvQtC15cE7dQYPh
Address:
    dealcyggS8jAJvm7qgiX25L1aRGbhrRfbyLDcZVdqegUbS2DY
```

What you're seeing here is the base for a wallet. There is a private key, a compressed public key, and an address. We'll change the code such that the genesis transaction is transferred to your wallet, so you can spend the coins. In this example, I'll use the above values.

#### 2. Change the database template

The first time you run dealcoin.py, a database is generated from the template dealcoinBase.sql. This file holds the genesis transaction, which is the first transaction for the currency. This transaction creates coins from thin air, and transfers then to an account.

Go ahead and open dealcoinBase.sql. There is one line that looks like this:

`INSERT INTO transactions_outputs (id,amount,address,outputHash,transactionHash) VALUES (1,31337,'dealcoint3wMFeUjEyrNMRjUR3Y8wm2LopaQmy3PRjaKyWceN',.......`

This is the genesis transaction, that transfers 31337 coins to address dealcoint3wMFe... Change this address to the address generated with generateGenesis.py. So in this example, I change:

`dealcoint3wMFeUjEyrNMRjUR3Y8wm2LopaQmy3PRjaKyWceN`

to:

`dealcyggS8jAJvm7qgiX25L1aRGbhrRfbyLDcZVdqegUbS2DY`

If you ran dealcoin.py before, make sure you delete dealcoin.db after doing this edit.

#### 3. Fix your wallet

Do a `python dealcoin.py`. This will create the database and a random wallet. Now type `i`. You should see a wallet with no coins. Now type `q` to quit, and wait for it to quit.

Now, with dealcoin shut down, open dealcoin.db (the database) with an sqlite database editor. You can use a GUI tool for this or just `sqlite3`. On OS X I like to use a tool called DB Browser.

Browse to the table called wallets, and change the private key, public key and address to the values you generated with generateGenesis.py. Save the database, close the tool.

Now if everything went well, you can `python dealcoin.py`, and if you type `i` you should see that your wallet now contains 31337 coins. Neat.

#### 4. Exchange code

Make a copy of the dealcoin directory, and remove the dealcoin.db file from the copy. We'll use this copied directory on other nodes, so let's call this the public directory. You can rename it to dealcoinPub if you like. Now copy this public directory to another node on the network.

I'll refer to our main node (that holds the genesis private key) as node A, and the other node we just copied the public directory to node B.

On node B, just `python dealcoin.py` from the public directory. If you then type `i`, you should see a generated wallet address for B.

On node A, type `t` to make a transaction.
At `To: ` you enter the wallet address for node B. At `Amount: ` just enter a small number like 137.
Now if you press `i` on both nodes, you should see that the coins are transferred. Sometimes you need to type `b` on node B to sync the two.
