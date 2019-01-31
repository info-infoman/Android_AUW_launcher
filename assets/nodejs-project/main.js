const path = require('path');
var replace = require("replace");
var Datastore = require('nedb');

//load db
db = {};
//{"vtx":{"vin":{"nValue":0,"pubKey":"0","scriptSig":"0"}, "vout":{"nValue":0,"pubKey":"0"}, "txType":0, "feedback":"0", "url":"0", "token":"0", "tvalue":"0"}, "hashPrevBlock":"0", "hashMerkleRoot":"0", "hashAccountRoot":"0", "nVersion":1, "nHeight":0, "nTime":0, "nNonce":0, "_id":"0"}
db.blocks = new Datastore({ filename: __dirname+'/db/blocks', autoload: true });
db.trie = new Datastore({ filename: __dirname+'/db/trie', autoload: true });
db.peers = new Datastore({ filename: __dirname+'/db/peers', autoload: true });

//wws - web-wallet-server
//node - full node of coin
const state = {
    wws: null,
    node: null,
    sockets: [],
};

function start() {
    //init wws & node
    state.wws = require('./wws/')().listen(3000, () => {
        console.log('Started web-wallet on 3000');
    });
    state.wws.on('connection', (socket) => {
        console.log('Add socket wws', state.sockets.length + 1);
        state.sockets.push(socket);
    });
    state.node = require('./node/')( () => {
        console.log('Started node');
    });
//    state.node.on('connection', (socket) => {
//        console.log('Add socket node', state.sockets.length + 1);
//        state.sockets.push(socket);
//    });
    //restart event
//    state.node.on('restart', () => {
//        console.log('Start reload fnc');
//        restart();
//    });
    //msg node<--->wws:

}

function pathCheck(id) {
    return (
        id.startsWith(path.join(__dirname, '/wws/'))||
        id.startsWith(path.join(__dirname, '/node/'))
    );
}

function restart() {
    // clean the cache
    Object.keys(require.cache).forEach((id) => {
        if (pathCheck(id)) {
            console.log('Delete cash', id);
            delete require.cache[id];
        }
    });

    state.sockets.forEach((socket, index) => {
        console.log('Destroying socket', index + 1);
        if (socket.destroyed === false) {
            socket.destroy();
        }
    });

    state.sockets = [];
    state.server.close();
    console.log('app is closed');
    console.log('\n----------------- restarting -------------');
    start();
}

start();