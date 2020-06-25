import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader } from 'semantic-ui-react';
import QRCode from 'qrcode.react'
import PactCallContext from '../contexts/PactCallContext'

const TXSuccess = (props) => {

  const pcContext = useContext(PactCallContext);

  return (
    <div>
    <Message color='blue'>
      <Message.Header style={{marginBottom: 10}}>
        {`Test Successfully ${props.title[0].toUpperCase()}${props.title.slice(1)}!`}
      </Message.Header>
        <div style={{marginBottom: 5}}>
          {(props.title === "administered" ?
            `Test administed and recorded permanently on Kadena mainnet. Please have patient scan the QR Code to have a record of their test`
          : `Test administed and recorded permanently on Kadena mainnet. Patient can access record from QR Code shown when test was admininstered`)}
        </div>
        <div style={{marginBottom: 20}}>
          <a href={`https://explorer.chainweb.com/testnet/tx/${pcContext.txData.reqKey}`}>
            Kadena Block Explorer Link
          </a>
        </div>
        {(props.title === "administered" ?
          <div>
            <QRCode value={`{"url": "https://explorer.chainweb.com/testnet/tx/${pcContext.txData.reqKey}", "chainId": ${props.chainId}, "pubKey": "${props.pubKey}"}`}/>
          </div>
        : <div></div>)}
        <Button
            style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 240,
              marginTop: 15
              }}
            onClick={() => window.location.reload()}
          >
          Done
        </Button>
    </Message>

    </div>
  )

}

export default TXSuccess;
