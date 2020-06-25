import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment } from 'semantic-ui-react';
import PactContext from '../contexts/PactContext';


const SuccessMsg = () => {

  const pactContext = useContext(PactContext);

  return(
    <div>
      <header className="App-header">
        <Segment>
          <div style={{marginLeft:70, marginRight: 70, marginTop: 20, marginBottom: 20, textAlign: "center"}}>
            <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 10 }}>
              Tests Successfully Registered!
            </Header>
            <Header as='h4'  textAlign='center' style={{color: "#333333", marginBottom: 30 }}>
              Test Label QR codes downloaded and recorded permanently Kadena mainnet
            </Header>
            <Button
              style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 360,
              }}
              onClick={() => window.location.reload()}
            >
              Done
            </Button>
          </div>
        </Segment>
      </header>
    </div>
  )

}

export default SuccessMsg;
