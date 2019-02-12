const path = require('path');
var replace = require("replace");

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