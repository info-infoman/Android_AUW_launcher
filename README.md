# What is all this for?
1) Doesn't it seem strange to you that decentralized cryptocurrency codes are written by narrow groups of individuals?
2) You are not afraid if suddenly the cryptocurrency in which you invested your strength and funds suddenly ceased to be supported by the development team?
3) You are not afraid if suddenly github will be closed?
4) Is it right that the sources of decentralized cryptocurrency are in one place?
5) Do you think many users of cryptocurrency will be able to independently assemble a ready-made application from source?

# Answers:
This application is an attempt to create an application that is easy to use by ordinary people, which will automatically update itself, besides updates will take effect only by public voting in the blockchain, besides updates will be distributed not through third-party centralized resources, but directly in the cryptocurrency network nodes of this network. Any miner can now not only vote for money moving inside the chet but also for the direction of upgrading this network.

# Auto Updates:
Auto-updates are snapshots (possibly git) of folders and files of a new version of the program that are broadcast to the network by the developers along with the newly generated block. Network nodes must store these snapshots along with the blocks. It is necessary to add an update hash field to block headers, if the miner does not want to agree with the update offered in the previous block, he can indicate in his generated block the hash amount of his current program version, or the hash amount of his own update version. As soon as in the chain of 10,000 blocks all blocks vote for the same update, the update will be considered accepted by the network, from now on if the blockchain branch rolls back, the application must reject the new blockchain branches with a different hash of the update amount, even if the proposed chain is long more than 10000 blocks, this condition can be called a fixation check point.

# Backward compatibility:
XCN has the ability to contain a blockchain in the form of a truncated chain of blocks, where blocks whose height < last block - 10,000 records only headers into the database, and the last 10,000 blocks have full size.
This means that we must move the activation date of auto-update beyond the 10,000 blocks. In reality, this means that auto-update will take effect only after 10,000 blocks from the moment of acceptance of this update by the network. During this period, the network should process according to the old scheme all the frayed transactions that appeared on the network before the network accepted the update, while new transactions and blocks should be made only according to the new scheme. Thus, we must have a double mechanism for checking information (old mechanism for checking old tx and new mechanism for checking information from the network). Since we are dealing with a mobile application and since it does not make sense for us to know about old transactions, we need to add a mechanism for clear old blocks from transactions.

# Easy launcher to start the application - android_NodeJS_naive_autoupdate_XCN-like_Launcher
This is an application for android whose task is to start the NodeJS process in a folder, then the application in this folder works on the basis of its internal logic. You ask - why the mobile application launcher? I will answer, it will help to distribute the application among a large number of ordinary people, and since our application is self-updating it will not be necessary for them to keep track of updating wallets on github and other resources for geeks. Thus, we kill two birds with one stone - 1) make cryptocurrency more decentralized and independent, 2) expand the circle of users

0) install android studio
1) load https://github.com/janeasystems/nodejs-mobile-samples/tree/master/android/native-gradle-node-folder and go to android/native-gradle-node-folder/
2) Copy file from this repo to android/native-gradle-node-folder/app/src/main
3) load or compile https://github.com/janeasystems/nodejs-mobile/releases/download/nodejs-mobile-v0.1.6/nodejs-mobile-v0.1.6-android.zip
4) Copy the bin/ folder from inside the downloaded zip file to app/libnode/bin (There are copy-libnode.so-here files in each architecture's path for convenience). If it's been done correctly you'll end with the following paths for the binaries:
    app/libnode/bin/arm64-v8a/libnode.so
    app/libnode/bin/armeabi-v7a/libnode.so
    app/libnode/bin/x86/libnode.so
    app/libnode/bin/x86_64/libnode.so
5) install NodeJS
6) Run npm install inside android/native-gradle-node-folder/app/src/main/assets/nodejs-project/
7) In Android Studio import the android/native-gradle/ gradle project. It will automatically check for dependencies and prompt you to install missing requirements (i.e. you may need to update the Android SDK build tools to the required version (25.0.3) and install CMake to compile the C++ file that bridges Java to the Node.js on Mobile library).
8) set in build.gradle classpath 'com.android.tools.build:gradle:3.3.0'
9) After the gradle build completes, run the app on a compatible device.

There are restrictions on the operation of NodeJS applications inside this folder:
1) You cannot run child processes in any form (you may be able to figure out how to do this)
2) Cannot run npm commands.

All we can do is stop loops, close sockets, update files and require cache.

# The main scheme of work
![Android_AUW_launcher](https://github.com/info-infoman/Android_AUW_launcher/blob/master/unknown.png?raw=true)

# we need module(work plan):
0) The main module that will update and restart all the modules listed below based on the logic described above.
1) bitcoin-net for connect to peer https://github.com/mappum/bitcoin-net and add some rule for xcn
2) blockchain-download  for load blockhead abd full blocks(for xcn last 10k) https://github.com/mappum/blockchain-download and add some rule for xcn
3) blockchain-spv for check and load block to db https://github.com/mappum/blockchain-spv add some rule for xcn witch full blocks(for xcn last 10k)
4) bitcoin-inventory for exchange tx https://github.com/mappum/bitcoin-inventory
5) bitcoin-merkle-proof https://github.com/mappum/bitcoin-merkle-proof and create xcn-trie-proof
6) add express server for local web-wallet 

All points need to check for autorestart witch scheme stop-remove require-close socket-start

# A look into the future:
So, let's say we have a mobile self-updating polymorphic application for cryptocurrency, since this application is based on XCN-like algorithms, then it can fairly work in the FeedBackCoin algorithm, what will it give us?

The FeedBackCoin algorithm has a super transaction mechanism, it is ready and working, and even passed some tests, and so, this mechanism allows transactions to sense the outside world without intermediaries, which means that we can produce an equivalent and non-equivalent information exchange between these super transactions which related - blockchains (exchange coins). 

And now the most important thing: having a mechanism for voting for the structure of the application, and a system for exchanging information between related blockchains through the mechanism of supertransactions, what prevents us from solving the problem of blockchain scaling through creating parallel independent related mini-blockchains in one application? Imagine a system where there is a main blockchain in which pictures of automatic updates are approved and parallel addition of new parallel independent blockchains that carry other information but also act on the same algorithm as the main blockchain (except for the auto-update policy).

All this will allow the community of the main blockchain to vote directly, not only for the update but also for expanding the bandwidth by adding parallel blockchains. At the same time, the mechanism of super transactions will allow ordinary users to make equal micro-exchanges between blockchains inside their wallet automatically, automatically add new blockchains to it and not even notice that all this. The end user will simply see the amount of coins in his wallet and not suspect that they are in different blockchains. Naturally, for this, the internal exchange mechanism between parallel blockchains should have a tough pricing policy where the price of coins is determined by the equivalent to 1:1.

For miners, such a system will be useful in that they can automatically focus on those blockchains that they are interested in (many transactions and commissions), while they will not need to download full blocks from all parallel blockchains, only main-blockchain block headers and full child-blockchain blocks. which they chose to mine. At the same time, the miners will see to mine those chains that are have a lot of transactions, or at which the least complexity, thereby maintaining the balance of performance of all parallel blockchains at about the same level. There will be a struggle in the network between miners wishing to expand the number of parallel blockchains (in order to increase earnings) and those who are against the excessive expansion of networks (weakening and devaluing the entire system as a whole).

For ordinary users, such a system will allow them to freely exchange coins for goods between their wallets even if their coins are in different parallel blockchains, for this their supertransactions will be sufficiently convinced that the proposed coin is in the blockchain which is registered in their application and the sender has the right to send these coins. The end user will not see the difference between the coins as their price will always be equivalent to 1: 1
