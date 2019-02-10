plan to dev:
1)In nodejs-project create spec folder 'dev'- it is copy 'nodejs-project' besides dev folder
2)install meowvc from https://github.com/info-infoman/meowvc
3)add in meowvc new command mu('stat',[prev_message,last_message]) show to users differences

Algo:
0) send command mu('start','genesis') - this is create first commit of dev folder
1) (miner_dev)change some code in dev folder
2) send command mu('save','some_name') - this create next commit of dev folder
3) now if we are create new block insert in block head hash summ specified in last commit tree 
- we must load dev/.mu/history/master/meta.json and get last mesage, then load dev/.mu/history/master/'v'+name_mesage+'.json' and hash(Object_mesage)
4) if block hash is best, send this block head and commit tree and files from dev/.mu/disk_mem/lines/ 
5) other node who accepted this update check the tree hash specified in block head update hash and hash files from dev/.mu/disk_mem/lines/, if success
load tree in dev/.mu/history/master/'v'+name_mesage+'.json' and add files in to dev/.mu/disk_mem/lines/
6) then nodes must update dev folder - send command mu('undo','.')
7) now if nodes agree with update, they are must add hash of this upodate in new created block.
8) if hash of this update will be added in last 10000 blocks all nodes copy and replase all(besides .mu, _muignore) file from dev to nodejs-project
    
