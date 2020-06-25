import React from 'react';
import Pact from 'pact-lang-api';
var hash = require('object-hash');

const Context = React.createContext();

const hosts = ["us1", "us2"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`

export class PactCallStore extends React.Component {

  state = {
    testInfo: {},
    txData: {},
    loading: false,
    txStatus: "",
    screen: "welcome",
    scans: []
  }

  getSavedScans = async () => {
    let scans = await localStorage.getItem('scans');
    console.log('init', scans)
    scans = JSON.parse(scans)
    if (scans === null) {
      scans = [];
      await localStorage.setItem('scans', JSON.stringify([]));
    }
    await this.setState({ scans: scans })
  }

  wait = async (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
  }

  setScreen = async (name) => {
    await this.setState({ screen: name });
  }

  getTest = async (pubKey, chainId) => {
    await this.setState({ loading: true })
    const dmKp = Pact.crypto.genKeyPair()
    const res = await Pact.fetch.local({
        networkId: "testnet04",
        // pactCode:`(user.covid.get-record ${JSON.stringify(pubKey)})`,
        pactCode: `(user.covid.get-record ${JSON.stringify(pubKey)})`,
        keyPairs: [{...dmKp, clist: {name: "coin.GAS", args: []}}],
        meta: Pact.lang.mkMeta("dummy-local",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId))
    if (res.result.status === "success") {
      await this.setState({ testInfo: res.result.data })
      await this.setState({ loading: false })
      return res.result.data;
    } else {
      await this.setState({ testInfo: "failure" })
      await this.setState({ loading: false })
      return "failure"
    }
  }

  administerTest = async (pubKey, privKey, chainId, ageGroup, gender, name, surname, dob, id, zip, country) => {
    await this.setState({ loading: true })
    const patientJSON = {
      name: name,
      surname: surname,
      dob: dob,
      id: id
    }
    const reqKey = await Pact.fetch.send({
        networkId: "testnet04",
        pactCode:`(user.covid.administer-test ${JSON.stringify(pubKey)} ${JSON.stringify(ageGroup)} ${JSON.stringify(gender)} ${JSON.stringify(country)} ${JSON.stringify(zip)} ${JSON.stringify(hash(patientJSON))})`,
        keyPairs: [
          {
            publicKey: pubKey,
            secretKey: privKey,
            clist: [
              {
                name: "user.covid.REGISTERED-TEST",
                args: [pubKey]
              },
              {
                name: `user.covid-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
        meta: Pact.lang.mkMeta("covid-gas-payer",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId));
        if (reqKey) {
          //check kadena tx status every 10 seconds until we get a response (success or fail)
          var time = 180;
          var pollRes;
          while (time > 0) {
            await this.wait(10000);
            pollRes = await Pact.fetch.poll({requestKeys: [reqKey.requestKeys[0]]}, createAPIHost(hosts[0], chainId));
            if (Object.keys(pollRes).length === 0) {
              console.log('no return poll');
              console.log(pollRes)
              time = time - 10
            } else {
              console.log(pollRes);
              time = 0;
            }
          }
          //tx successful
          if (pollRes[reqKey.requestKeys[0]].result.status === "success"){
            //doc registered on blockchain, now add to db
            await this.setState({loading: false, txStatus: 'success', txData: pollRes[reqKey.requestKeys[0]]})
            // alert("The test was successfuly registered on Kadena mainnet")
            //SHOW A MESSAGE OF SUCCESS
            // window.location.reload();
          //tx unsuccessful
          } else {
            await this.setState({loading: false, txStatus: 'failure', txData: pollRes[reqKey.requestKeys[0]]})
            // alert("there was a problem processing your transaction on Kadena mainnet")
            // window.location.reload();
          }
        } else {
          //blockchain call had formatting issues
          await this.setState({loading: false, txStatus: 'failure', txData: pollRes[reqKey.requestKeys[0]]})
          // alert("there was a problem processing your transaction on Kadena mainnet")
          // window.location.reload();
        }
  }

  endTest = async (pubKey, privKey, chainId, result) => {
    await this.setState({ loading: true })
    const reqKey = await Pact.fetch.send({
        networkId: "testnet04",
        pactCode:`(user.covid.end-test ${JSON.stringify(pubKey)} ${JSON.stringify(result)})`,
        keyPairs: [
          {
            publicKey: pubKey,
            secretKey: privKey,
            clist: [
              {
                name: "user.covid.REGISTERED-TEST",
                args: [pubKey]
              },
              {
                name: `user.covid-gas-station.GAS_PAYER`,
                args: ["hi", {int: 1}, 1.0]
              }
            ]
          }],
        meta: Pact.lang.mkMeta("covid-gas-payer",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId));
        if (reqKey) {
          //check kadena tx status every 10 seconds until we get a response (success or fail)
          var time = 180;
          var pollRes;
          while (time > 0) {
            await this.wait(10000);
            pollRes = await Pact.fetch.poll({requestKeys: [reqKey.requestKeys[0]]}, createAPIHost(hosts[0], chainId));
            if (Object.keys(pollRes).length === 0) {
              console.log('no return poll');
              console.log(pollRes)
              time = time - 10
            } else {
              console.log(pollRes);
              time = 0;
            }
          }
          //tx successful
          if (pollRes[reqKey.requestKeys[0]].result.status === "success"){
            //doc registered on blockchain, now add to db
            await this.setState({loading: false, txStatus: 'success', txData: pollRes[reqKey.requestKeys[0]]})
          //tx unsuccessful
          } else {
            await this.setState({loading: false, txStatus: 'failure', txData: pollRes[reqKey.requestKeys[0]]})
          }
        } else {
          //blockchain call had formatting issues
          await this.setState({loading: false, txStatus: 'failure', txData: pollRes[reqKey.requestKeys[0]]})
        }
  }

  handleQRScan = async (qrData) => {
    await this.setState({ loading: true })
    const pastScans = this.state.scans.slice()
    console.log(qrData["chainId"])
    let reqKey = qrData["url"].split("").reverse().join("");
    const ci = qrData["chainId"].toString()
    reqKey = reqKey.substring(0, reqKey.indexOf("/")).split("").reverse().join("")
    let test = await this.getTest(qrData["pubKey"], ci)
    console.log(test)
    const newScan = {
      chainId: ci,
      url: qrData["url"],
      pubKey: qrData["pubKey"],
      key: Math.floor(Math.random() *  100000000000),
      reqKey: reqKey,
      test: test
    }
    pastScans.push(newScan);

    await localStorage.setItem('scans', JSON.stringify(pastScans))
    await this.setState({ scans: pastScans, screen: 'history', loading: false })
}

getTestHist = async (pubKey, chainId) => {
  try {
    const dummyKP = Pact.crypto.genKeyPair();
    const res = await Pact.fetch.local({
        networkId: "testnet04",
        pactCode: `(user.covid.get-record ${JSON.stringify(pubKey)})`,
        keyPairs: [{...dummyKP, clist: {name: "coin.GAS", args: []}}],
        meta: Pact.lang.mkMeta("dummy-local",chainId,0.00000001,10000,(Math.round((new Date).getTime()/1000)-15), 28800)}, createAPIHost(hosts[0], chainId))
    if (res.result.status === "success") {
      return res.result.data;
    } else {
      return {}
    }
  } catch (e) {
    console.log(e)
    alert(`an error occurred`)
    return {}
  }
}

updateScans = async () => {
  await this.setState({ loading: true })
  const pastScans = this.state.scans.slice()
  const updatedTests = []
  for (let i = 0; i < pastScans.length; i++) {
    if (pastScans[i]['test']['result'] !== "") {
      updatedTests.push(pastScans[i])
    } else {
      const updatedTest = await this.getTestHist(pastScans[i].pubKey, pastScans[i].chainId)
      pastScans[i].test = updatedTest
      updatedTests.push(pastScans[i])
    }
  }
  console.log(pastScans)
  await this.setState({ scans: updatedTests, loading:false })
  await localStorage.setItem('scans', JSON.stringify(updatedTests))
}


  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          getTest: this.getTest,
          administerTest: this.administerTest,
          endTest: this.endTest,
          setScreen: this.setScreen,
          getSavedScans: this.getSavedScans,
          handleQRScan: this.handleQRScan,
          updateScans: this.updateScans
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;
