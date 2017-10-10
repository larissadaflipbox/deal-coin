#!/usr/bin/python

import dealcoin

import dealcoin.wallets
import dealcoin.transactions

#coolAddressNames = ['dealcoin','dealcoiN','dealco1n','dealco1N']

#while 1:
privateKey, publicKey = dealcoin.wallets.dealcoin.ecc.make_keypair()
compressedPublicKey  = dealcoin.wallets.compressPublicKey(publicKey)
newAddress = dealcoin.wallets.publicKeyToAddress(compressedPublicKey)

#print newAddress[:9]
#if newAddress[:9] in coolAddressNames:
print "Private key:\n\t%s" % privateKey
#print publicKey
print "Compressed public key:\n\t%s" % compressedPublicKey
print "Address:\n\t%s" % newAddress
