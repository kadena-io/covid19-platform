import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment } from 'semantic-ui-react';
import PactCallContext from '../contexts/PactCallContext'


const Welcome = () => {

  const pcContext = useContext(PactCallContext);

  return (
    <header className="App-header">
        <Segment style={{ margin: 10 }}>
          <div style={{textAlign: "center"}}>
            <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 0, marginTop: 10 }}>
              Test Portal
            </Header>
            <Header as='h4'  textAlign='center' style={{color: "#333333", marginBottom: 30, marginLeft: 40, marginRight: 40}}>
              Please select an action
            </Header>
            <Button
              style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 240,
              marginBottom: 20
              }}
              onClick={() => pcContext.setScreen("scan-patient")}
            >
              Scan New Test
            </Button>
            <Button
              style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 240,
              marginBottom: 20
              }}
              onClick={() => pcContext.setScreen("history")}
            >
              Show Past Tests
            </Button>
          </div>
        </Segment>
      </header>
  )

}

export default Welcome;
