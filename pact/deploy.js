'use strict';
var fs = require("fs")
var fetch = require("node-fetch")
var Pact = require("../frontend/node_modules/pact-lang-api/pact-lang-api.js")
var config = require("../frontend/src/config.json");


var module = fs.readFileSync("./covid-v2.pact", 'utf-8')
var chainId = "9";
const apiHost = `https://us1.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`
const creationTime = () => Math.round((new Date).getTime()/1000)-15

const deploy = {
  pactCode: module,
  keyPairs: {...config.covidAdminKeys, clist: []},
  meta: Pact.lang.mkMeta("covid-admin", chainId, 0.00000000001, 10000, creationTime(), 28800),
  nonce: "Deploy Covid",
  networkId: "testnet04"
}


Pact.fetch.send(deploy, apiHost).then(result => {
  console.log(result)
  Pact.fetch.listen({listen: result.requestKeys[0]}, apiHost).then(console.log)
}).catch(e => console.log(e))
