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
  const [loading, setLoading] = useState(false);
  const [scanType, setScanType] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");


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

  const handleQRScan = async (data) => {
    if (data) {
      const parsed = JSON.parse(data)
      const keys = Object.keys(parsed)
      console.log(parsed)
      if (keys.length === 3 && keys.includes("chainId") && keys.includes("url") && keys.includes("pubKey")) {
        setshowQR(false);
        await pcContext.handleQRScan(parsed);
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
        (scanType === ""
          ?
                <div>
                  <Message color="blue">
                    <QrReader
                      onError={handleQRError}
                      onScan={handleQRScan}
                    />
                  </Message>
                  <Header as='h5'  textAlign='center' style={{color: "#054F9E", marginLeft: 40, marginRight: 40}}>
                    NOTE: Shown when doctor successfully administers test
                  </Header>
                </div>
          :
          errorComponent()
        )
      )}

      </div>
    </Segment>
  )

}

export default QRScan;
