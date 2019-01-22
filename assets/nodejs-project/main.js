const path = require('path');
const chokidar = require('chokidar');
//test change file
var schedule = require('node-schedule');
var replace = require("replace");

var databaseUrl = __dirname+"/db/clients.db";
var Datastore = require('nedb');
db = {};
db.clients = new Datastore({ filename: databaseUrl, autoload: true });

const state = {
  server: null,
  sockets: [],
};

function start() {
  console.log('restart');
  state.server = require('./server')().listen(3000, () => {
    console.log('Started on 3000');
  });
  state.server.on('connection', (socket) => {
    console.log('Add socket', state.sockets.length + 1);
    state.sockets.push(socket);
  });

  schedule.scheduleJob(new Date().getTime()+(10*1000), async function(){
    console.log('ch file');

    var text="console.log('ok, script self updated');";

    replace({
        regex: "//test String//",
        replacement: text,
        paths: [__dirname+'/routes/clients.js'],
        recursive: true,
        silent: true,
    });

    restart();


  });

}

function pathCheck(id) {
  return (
    id.startsWith(path.join(__dirname, 'routes')) ||
    id.startsWith(path.join(__dirname, 'server.js'))
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

  state.server.close(() => {
    console.log('Server is closed');
    console.log('\n----------------- restarting -------------');
    start();
  });
}

start();