const path = require('path');
//test change file
var replace = require("replace");

//var blocks = __dirname+"/db/blocks.db";

var Datastore = require('nedb');
db = {};
db.blocks = new Datastore({ filename: __dirname+'/db/blocks', autoload: true });
db.txs = new Datastore({ filename: __dirname+'/db/txs', autoload: true });
db.trie = new Datastore({ filename: __dirname+'/db/trie', autoload: true });
db.peers = new Datastore({ filename: __dirname+'/db/peers', autoload: true });



const state = {
  full_node: null,
  sockets: [],
};

function start() {
  state.full_node = require('./full_node')().listen(3000, () => {
    console.log('Started on 3000');
  });
  state.full_node.on('connection', (socket) => {
    console.log('Add socket', state.sockets.length + 1);
    state.sockets.push(socket);
  });


//    replace({
//        regex: "//test String//",
//        replacement: text,
//        paths: [__dirname+'/routes/clients.js'],
//        recursive: true,
//        silent: true,
//    });

//    restart();

}

function pathCheck(id) {
  return (
    id.startsWith(path.join(__dirname, 'full_node.js'))
  );
}

function restart() {
  // clean the cache
  Object.keys(require.cache).forEach((id) => {
    if (pathCheck(id)) {
      console.log('Reloading', id);
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

  console.log('\n----------------- restarting -------------');
    start();

}

start();