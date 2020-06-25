import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment } from 'semantic-ui-react';
import InitRecord from './InitRecord';
import EndRecord from './EndRecord';
import QrReader from 'react-qr-reader'
import PactCallContext from '../contexts/PactCallContext'


const QRScan = () => {

  const pcContext = useContext(PactCallContext);

  const [showQR, setshowQR] = useState(true);
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [chainId, setChainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanType, setScanType] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");

  const getInfo = async (pubKey, chainId) => {
    setLoading(true)
    const res = await pcContext.getTest(pubKey, chainId);
    console.log(res);
    if (res === "failure") {
      //this public key was never registered on chain -> SHOW ERROR
      setScanType('not registered on the blockchain')
    } else {
      if (res["test-init-bh"]["int"] === 0){
        //test is registered and not used yet -> SHOW INIT TEST
        setModel(res["test-model"]);
        setBrand(res["test-manufacturer"]);
        setScanType('init')
      } if (res["test-init-bh"]["int"] !== 0 && res["test-end-bh"]["int"] === 0) {
        //test is registered and administered -> SHOW END TEST
        setScanType('end')
      } if (res["test-init-bh"]["int"] !== 0 && res["test-end-bh"]["int"] !== 0) {
        //test has already been used -> SHOW ERROR
        setScanType('already used')
      }
    }
    setLoading(false);
  }

  const errorComponent = () => {
    return (
      <div>
        <Message color='red' style={{marginBottom: 20}}>
          <Message.Header>
            Invalid Test!
          </Message.Header>
            {`Please report immediately. This test is compromised as it was ${scanType}`}
        </Message>
      </div>
    );
  }

  const handleQRScan = data => {
    if (data) {
      console.log(data);
      data = JSON.parse(data);
      console.log(data);
      if (data.keypair && data.chainId) {
        setPubKey(data.keypair.publicKey);
        setPrivKey(data.keypair.secretKey);
        setChainId(data.chainId);
        setshowQR(false);
        getInfo(data.keypair.publicKey, data.chainId);
      } else {
        //QR code data format invalid
        setScanType('formatted incorrectly')
      }
    }

  }

  const handleQRError = err => {
    console.error(err)
  }

  return (
    <Segment style={{ margin: 10 }}>
    <div style={{marginTop: 10}}>
    {(scanType === "" ?
      <div>
        <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 20, marginTop: 0 }}>
          {(scanType === "" ? "Scan QR Code" : "")}
        </Header>
      </div>
     : <div></div>)}
    {(loading ? <Loader active inline /> :
      (scanType === "" ?
        (showQR ?
              <div>
                <Message color="blue">
                  <QrReader
                    onError={handleQRError}
                    onScan={handleQRScan}
                  />
                </Message>
                <Button
                    style={{
                      backgroundColor: "#054F9E",
                      color: "white",
                      width: 160,
                      marginTop: 5,
                      marginBottom: 5
                      }}
                    onClick={() => setshowQR(false)}
                  >
                  Close and Type
                </Button>
              </div>
              :
              <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "10px", marginBottom: 0}} >
                <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 20}}>Test Public Key
                  <Popup
                    trigger={
                      <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                    }
                    position='top center'
                  >
                    <Popup.Header>Test Public Key</Popup.Header>
                    <Popup.Content>Enter Public Key displayed under QR code</Popup.Content>
                  </Popup>
                </label>
                <div>
                  <Input
                    style={{width:"240px", marginBottom: 3, marginTop: 5}}
                    icon='key'
                    iconPosition='left'
                    placeholder='Public Key'
                    value={pubKey}
                    onChange={(e) => setPubKey(e.target.value)}
                  />

                </div>


                <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 20}}>Test Secret Key
                  <Popup
                    trigger={
                      <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                    }
                    position='top center'
                  >
                    <Popup.Header>Test Secret Key</Popup.Header>
                    <Popup.Content>Enter Secret Key displayed under QR code</Popup.Content>
                  </Popup>
                </label>
                <div>
                  <Input
                    style={{width:"240px", marginBottom: 3, marginTop: 5}}
                    icon='lock'
                    iconPosition='left'
                    placeholder='Secret Key'
                    value={privKey}
                    onChange={(e) => setPrivKey(e.target.value)}
                  />

                </div>

                <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 20}}>Test Chain ID
                  <Popup
                    trigger={
                      <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                    }
                    position='top center'
                  >
                    <Popup.Header>Test Chain ID</Popup.Header>
                    <Popup.Content>Enter Chain ID displayed under QR code (0-9)</Popup.Content>
                  </Popup>
                </label>
                <div>
                  <Input
                    style={{width:"240px", marginBottom: 3, marginTop: 5}}
                    icon='chain'
                    iconPosition='left'
                    placeholder='Chain ID'
                    value={chainId}
                    onChange={(e) => setChainId(e.target.value)}
                  />

                </div>



                <Button
                    style={{
                      backgroundColor: "#054F9E",
                      color: "white",
                      width: 240,
                      marginTop: 5,
                      marginBottom: 10
                      }}
                    disabled={pubKey === "" || chainId === "" || privKey === ""}
                    onClick={async () => await getInfo(pubKey, chainId)}

                  >
                  Submit
                </Button>
              </Form.Field>
            ) : (scanType === 'init' ?
              <InitRecord
                pubKey={pubKey}
                chainId={chainId}
                privKey={privKey}
                model={model}
                brand={brand}
              />
              : (scanType === 'end' ?
                <EndRecord pubKey={pubKey} chainId={chainId} privKey={privKey}/>
                : errorComponent())))
    )}

    </div>
    </Segment>
  )

}

export default QRScan;
