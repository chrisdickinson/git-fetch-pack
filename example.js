var net = require('net')
  , load = require('git-fs-repo')
  , fs = require('fs')
  , transport = require('git-transport-protocol')
  , walk = require('git-walk-refs')
  , gitclient = require('./index')('git://github.com/chrisdickinson/plate.git')

load('/Users/chris/projects/experiments/plate/.git', function(err, git) {
  var refs = git.refs()
    , hashes = refs.map(function(x) { return x.hash })
    , tcp = net.connect({host: 'github.com', port: 9418})
    , client

  client = gitclient(want, walk(find, hashes))

  client.refs.on('data', console.log)

  client
    .pipe(transport(tcp))
    .pipe(client)

  client.pack.pipe(fs.createWriteStream('client-output'))

  return

  function find(oid, ready) {
    return git.find(oid, ready)
  }

  function want(ref, ready) {
    if(ref.name === 'refs/heads/master') {
      return ready(true)
    }
    return ready(false)
  }
})

