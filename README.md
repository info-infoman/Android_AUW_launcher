# android_NodeJS_naive_autoupdate_XCN-like_Launcher
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
8) set in build.gradle classpath 'com.android.tools.build:gradle:3.2.1'
9) After the gradle build completes, run the app on a compatible device.

we need module(work plan):
1) bitcoin-net for connect to peer https://github.com/mappum/bitcoin-net and add some rule for xcn
2) blockchain-download  for load blockhead abd full blocks(for xcn last 10k) https://github.com/mappum/blockchain-download and add some rule for xcn
3) blockchain-spv for check and load block to db https://github.com/mappum/blockchain-spv add some rule for xcn witch full blocks(for xcn last 10k)
4) bitcoin-inventory for exchange tx https://github.com/mappum/bitcoin-inventory
5) bitcoin-merkle-proof https://github.com/mappum/bitcoin-merkle-proof and create xcn-trie-proof
6) add express server for local web-wallet 


All points need to check for autorestart witch scheme stop-remove require-close socket-start
![](https://github.com/info-infoman/Android_AUW_launcher/unknown.png)


