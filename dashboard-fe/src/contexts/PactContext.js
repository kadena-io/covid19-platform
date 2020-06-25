import React from 'react';
import Pact from 'pact-lang-api';
import QRCode from 'qrcode'
import { saveAs } from "file-saver";
const fs = require('fs')
const zip = require('jszip')()


const Context = React.createContext();


const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`

export class PactStore extends React.Component {

  state = {
    loading: false,
    txObj: {
      0: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      1: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      2: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      3: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      4: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      5: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      6: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      7: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      8: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} },
      9: { pactCode: [], keypairs: [], qrs: [], envData: {}, reqKey: "", pollRes: {} }
    },
    txStatus: "",
    successes: 0,
    total: 0
  }

  setTxStatus = async (status) => {
    await this.setState({ txStatus: status })
  }

  downloadURI = async (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  generateQR = async text => {
    try {
      const qr = await QRCode.toDataURL(text)
      return qr
    } catch (err) {
      console.error(err)
    }
  }


  wait = async (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
  }


  printQRs = async (brand, model) => {
    const date = new Date().toISOString().slice(0,10)
    //do for all 10 chains
    //i is the chainId
    var folder = zip.folder(`qrs-${brand}-${date}`);
    for (let i = 0; i < 10; i++) {
      const tx = this.state.txObj;
      //skip those without positive result
      if (tx[i].reqKey !== "" && tx[i].pollRes.result.status === "success") {
        const qrs = tx[i].qrs;
        await this.setState({ successes: this.state.successes + qrs.length })
        for (let j = 0; j < qrs.length; j++){
          folder.file(`${brand}-${model}-${date}-c${i}-${tx[i]["keypairs"][j].publicKey.substring(0, 6)}.png`, qrs[j].split('base64,')[1],{base64: true})
        }
      }
    }
    //download only if qr codes are in the folder
    if (Object.keys(folder.files).length > 1) {
      zip.generateAsync({type:"blob"})
            .then(function(content) {
              saveAs(content, `qrs-${brand}-${date}.zip`);
      });
    }
  }

  pollTxs = async () => {
    //do for all 10 chains
    //i is the chainId
    for (let i = 0; i < 10; i++){
      const tx = this.state.txObj;
      //skip chains with no pact code
      if (tx[i].reqKey === "") { continue }
      const reqKey = tx[i].reqKey
      //check kadena tx status every 10 seconds until we get a response (success or fail)
      var time = 180;
      var pollRes;
      while (time > 0) {
        pollRes = await Pact.fetch.poll({requestKeys: [reqKey]}, createAPIHost(hosts[0], i.toString()));
        if (Object.keys(pollRes).length === 0) {
          console.log('no return poll');
          time = time - 10
          await this.wait(10000);
        } else {
          console.log(pollRes);
          time = 0;
        }
      }
      //tx successful
      if (pollRes[reqKey].result.status === "success"){
        console.log('great success', i)
        tx[i].pollRes = pollRes[reqKey];
        // await this.printQRs(qrs, brand, model, keysChain);
        await this.setState({ txObj: tx })
      //tx unsuccessful
      } else {
        console.log("response error", i)
        tx[i].pollRes = pollRes[reqKey];
        await this.setState({ txObj: tx })
      }
    }
  }

  mkSend = async (pubKey, privKey, brand, model) => {
    //do for all 10 chains
    //i is the chainId
    for (let i = 0; i < 10; i++){
      const tx = this.state.txObj;
      //skip chains with no pact code
      if (tx[i].pactCode.length === 0) { continue }
      const pactCode = `(user.covid.register-test ${JSON.stringify(pubKey)} ${JSON.stringify(brand)} ${JSON.stringify(model)} ${JSON.stringify(tx[i].pactCode)})`
      try {
        const reqKey = await Pact.fetch.send({
          networkId: "testnet04",
          pactCode: pactCode,
          keyPairs: [
          {
            publicKey: pubKey,
            secretKey: privKey,
            clist: [
              {
                name: "user.covid.PRINTING-ENTITY",
                args: [pubKey]
              },
              {
                name: `user.covid-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
          meta: Pact.lang.mkMeta("covid-gas-payer",i.toString(),0.00000001,1400000,(Math.round((new Date).getTime()/1000)-15), 28800),
          envData: tx[i].envData
        }, createAPIHost(hosts[0], i.toString()));
        tx[i].reqKey = reqKey.requestKeys[0];
        console.log(reqKey, i)
        await this.setState({ txObj: tx });
        } catch (e) {
          console.log("send failure", i, e)
        }
      }
    }

  formatTxObj = async (brand, model, amount, pubKey, privKey) => {
    for (let i = 0; i < parseInt(amount); i++) {
      const tx = this.state.txObj;
      const keypair = Pact.crypto.genKeyPair();
      const chainId = keypair.publicKey.replace(/\D/g,'')[0];
      const qrData = JSON.stringify({keypair, chainId: chainId});
      const qr = await this.generateQR(qrData);
      const acct = {
        "acct-name": keypair.publicKey,
        "ks-name": i.toString()
      }
      tx[chainId] = {
        pactCode: [...tx[chainId].pactCode, acct],
        keypairs: [...tx[chainId].keypairs, (keypair)],
        qrs: [...tx[chainId].qrs, qr],
        envData: {...tx[chainId].envData, [i]: {"pred": "keys-all", "keys": [keypair.publicKey]}},
        reqKey: "",
        pollRes: [],
      }
      await this.setState({ txObj: tx });
    }
  }

  registerTests = async (brand, model, amount, pubKey, privKey) => {
    await this.setState({ loading: true })
    await this.wait(100)
    await this.setState({ total: amount, successes: 0 });
    await this.formatTxObj(brand, model, amount, pubKey, privKey);
    await this.mkSend(pubKey, privKey, brand, model);
    await this.pollTxs();
    await this.printQRs(brand, model)
    this.setState({ loading: false });
    //
    if (this.state.successes === 0){
      this.setTxStatus("failure");
    }
    else if (this.state.successes === parseInt(amount)){
      this.setTxStatus("success");
    } else {
      this.setTxStatus("partial");
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          registerTests: this.registerTests,
          setTxStatus: this.setTxStatus
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
