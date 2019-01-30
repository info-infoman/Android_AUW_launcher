const path = require('path');
var replace = require("replace");
var Datastore = require('nedb');

//load db
db = {};
db.blocks = new Datastore({ filename: __dirname+'/db/blocks', autoload: true });
db.txs = new Datastore({ filename: __dirname+'/db/txs', autoload: true });
db.trie = new Datastore({ filename: __dirname+'/db/trie', autoload: true });
db.peers = new Datastore({ filename: __dirname+'/db/peers', autoload: true });

const state = {
    wws: null,
    node: null,
    sockets: [],
};

function start() {
    state.wws = require('./wws/')().listen(3000, () => {
        console.log('Started web-wallet on 3000');
    });
    state.wws.on('connection', (socket) => {
        console.log('Add socket wws', state.sockets.length + 1);
        state.sockets.push(socket);
    });

    state.node.on('restart', () => {
        console.log('Start reload fnc');
        restart();
    });
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