#!/usr/bin/python

import dealcoin

import dealcoin.wallets
import dealcoin.transactions


commands = {'q':'quit', 'h':'help', 'b':'broadcast', 't':'transaction', 'i':'information'}
running = True

if __name__ == "__main__":

	dealcoin.network.startNetworking()
	dealcoin.miner.startMining()
	
	while running:

		try:
		
			ui = raw_input("> ")

			if ui == 'q':
				break

			if ui == 'h':
				for c in commands:
					print "%s: %s" % (c, commands[c])

			if ui == 't':
				to = raw_input("To: ")
				amount = raw_input("Amount: ")
				dealcoin.transactions.createTransaction(to, amount)

			if ui == 'i':
				dealcoin.wallets.printBasicInfo()

			if ui == 'b':
				dealcoin.network.broadcastSync()

		except KeyboardInterrupt:
			print "Exiting ..."
			running = False
			break
				
		except Exception as e:
			print "Exception in main: " + e.message
			break

	dealcoin.network.stopServer = True
	dealcoin.miner.stopMiner = True
	dealcoin.threader.waitForThreads()
