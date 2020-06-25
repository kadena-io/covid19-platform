import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment } from 'semantic-ui-react';
import PactContext from "../contexts/PactContext";

import QRCode from 'qrcode'

const Inputs = () => {

  const pactContext = useContext(PactContext);

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [num, setNum] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function toKeyLoad(){
   try {
     var fileToLoad = document.getElementById("to-pub-file").files[0];
     if (fileToLoad.name.substr(fileToLoad.name.length - 4) !== ".kda" || fileToLoad.name.includes("public")) {
       alert(`file must be a .kda private key file`)
     }
     var fileReader = new FileReader();
     fileReader.onload = function(fileLoadedEvent){
         var textFromFileLoaded = fileLoadedEvent.target.result;
         var keys = textFromFileLoaded.split("\n");
         const pub = keys[0].replace("public: ", "");
         const priv = keys[1].replace("secret: ", "")
         checkKey(pub);
         checkKey(priv);
         setPubKey(pub);
         setPrivKey(priv);
     };
     fileReader.readAsText(fileToLoad, "UTF-8");
   } catch (err) {
     console.log(err)
     alert(`file must be a .kda private key file`)
   }
 }

 const is_hexadecimal = (str) => {
   const regexp = /^[0-9a-fA-F]+$/;
   if (regexp.test(str)) return true;
   else return false;
  }

 const checkKey = (key) => {
     if (key.length !== 64) {
       setError(true)
       setErrMsg("Key length is invalid")
     } else if (!is_hexadecimal(key)){
       setError(true)
       setErrMsg("Key format is invalid")
     } else {
       setError(false)
       setErrMsg("")
     }

 }

 const checkText = (text) => {
   if (text === "") {
     setError(true)
     setErrMsg("Please to not leave field empty")
   } else {
     setError(false)
     setErrMsg("")
   }
 }

 const checkNum = (num) => {
    if(num.match(/^-{0,1}\d+$/)){
      setError(false)
      setErrMsg("")
    } else {
      setError(true)
      setErrMsg("Please enter an integer for the amount of labels")
    }
  }


  return (
    <div>
      <header className="App-header">
      <Segment>
        <Form style={{marginBottom: 20, marginTop: 10, marginLeft: 100, marginRight: 100}}>
          <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 20 }}>
            Please fill the form below
          </Header>
          <Form.Field  style={{marginTop: "0px", marginBottom: 10, textAlign: "left"}} >
            <label style={{color: "#054F9E" }}>Enter Test Manufacturer Name
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is the Test Manufacturer Name? </Popup.Header>
              <Popup.Content>This is the name of the company to that produces or brands the test</Popup.Content>
              </Popup>
            </label>
            <Form.Input
              icon='building'
              iconPosition='left'
              placeholder='Manufacturer Name'
              value={name}
              onChange={(e) => {
                checkText(e.target.value)
                setName(e.target.value)
              }}
            />
          </Form.Field>
          <Form.Field  style={{marginTop: "0px", marginBottom: 10, textAlign: "left"}} >
            <label style={{color: "#054F9E" }}>Enter Test Model Name
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is the Test Model Name? </Popup.Header>
              <Popup.Content>This is the name that identifies this type of test within the manufacturer or brand</Popup.Content>
              </Popup>
            </label>
            <Form.Input
              icon='pencil alternate'
              iconPosition='left'
              placeholder='Model Name'
              value={model}
              onChange={(e) => {
                checkText(e.target.value)
                setModel(e.target.value)
              }}
            />
          </Form.Field>
          <Form.Field  style={{marginTop: "0px", marginBottom: 10, textAlign: "left"}} >
            <label style={{color: "#054F9E" }}>Amount of Test Labels to Print
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is the Test Model Name? </Popup.Header>
              <Popup.Content>This is the name that identifies this type of test within the manufacturer or brand</Popup.Content>
              </Popup>
            </label>
            <Form.Input
              icon='hashtag'
              iconPosition='left'
              placeholder='Label Amount'
              value={num}
              onChange={(e) => {
                checkNum(e.target.value)
                setNum(e.target.value)
              }}
            />
          </Form.Field>
          <Form.Field  style={{marginTop: "0px", marginBottom: 10, textAlign: "left"}} >
            <label style={{color: "#054F9E" }}>Sign Test Labels on Blockchain
              <Popup
                trigger={
                  <Icon name='help circle' style={{"marginLeft": "2px"}}/>
                }
                position='top center'
              >
              <Popup.Header>What is Signing? </Popup.Header>
              <Popup.Content>Enter your public and private key provided by Kadena to sign and generate QR codes</Popup.Content>
              </Popup>
            </label>
            <Input
              style={{marginBottom: 5}}
              placeholder='Public Key'
              icon="key"
              iconPosition="left"
              value={pubKey}
              onChange={(e) => {
                checkKey(e.target.value)
                setPubKey(e.target.value)
              }}
            />
            <Form.Input
              style={{marginBottom: 0}}
              placeholder='Private Key'
              icon="lock"
              iconPosition="left"
              type='password'
              value={privKey}
              onChange={(e) => {
                checkKey(e.target.value)
                setPrivKey(e.target.value)
              }}
            />
            <div style={{marginBottom: 20}}>
              <input
                  id="to-pub-file"
                  type="file"
                  style={{width: 180, marginRight: 20}}
                  onChange={(e) => toKeyLoad()}/>
              <Button
                style={{
                backgroundColor: "#054F9E",
                color: "white",
                width: 180,
                marginTop: 4
                }}
                onClick={() => {
                  setPubKey('f176b58f0f368c5d6ef1ef6b38f420c42d11ac633791edd638c61a88614d6935');
                  setPrivKey('10e3f185e3323c62bfc229d5b839db277ea4f6800a075e5f21d500bb963b1555');
                }}
              >
                Use Testnet Keypair
              </Button>
            </div>

          </Form.Field>
          {error ?
            <div style={{marginBottom: 20}}>
              <Message color='red'>
                <Message.Header style={{marginBottom: 5}}>
                  Input Error
                </Message.Header>
                {errMsg}
              </Message>
            </div>
          : (pactContext.loading ?
            <div style={{marginBottom: 20}}>
              <Message color="blue" style={{marginTop:30, textAlign: 'center'}} >
                <Message.Header style={{marginBottom: 5}}>
                  Please Do Not Refresh
                </Message.Header>
                <div>
                  We are registering the test labels on Kadena mainnet
                </div>
              </Message>
            </div>
            : <div></div>)}
          <Form.Field  style={{marginTop: "0px", marginBottom: 10, textAlign: "left"}} >
            <Button
              disabled={error || name === "" || model === "" || pubKey === "" || privKey === ""}
              loading={pactContext.loading}
              style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 380,
              }}
              onClick={() => pactContext.registerTests(name, model, num, pubKey, privKey)}
            >
              Sign and Generate QR Codes
            </Button>
          </Form.Field>
        </Form>
        </Segment>
      </header>
    </div>
  );

}

export default Inputs;
