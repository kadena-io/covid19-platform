import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu } from 'semantic-ui-react';
import { Camera } from 'react-cam';
import TXSuccess from './TXSuccess';
import TXError from './TXError';
import PactCallContext from '../contexts/PactCallContext'

var hash = require('object-hash');


const EndRecord = (props) => {

  const pcContext = useContext(PactCallContext);

  const [res, setRes] = useState("");

  return (
    <div>
    {(pcContext.txStatus === "" ?
      <div>
      <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "10px", marginBottom: 0}} >
        <label style={{color: "#054F9E", fontWeight: 'bold',}}>Test Public Key
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Test Public Key</Popup.Header>
            <Popup.Content>This is the PublicKey field printed in your QR code that serves to sign the transaction as a unique identifier</Popup.Content>
          </Popup>
        </label>
        <div>
          <Input
            style={{width:"240px", marginBottom: 3, marginTop: 5}}
            icon='hashtag'
            iconPosition='left'
            placeholder='Public Key'
            value={props.pubKey}
          />
        </div>
      </Form.Field>




      <Form.Field  style={{width:"300px", margin: "0 auto", marginTop: "10px", marginBottom: 0}} >
      <div>
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 0}}>Result
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Result</Popup.Header>
            <Popup.Content>Select positive or negative test result</Popup.Content>
          </Popup>
        </label>
      </div>
        <div style={{marginTop: 5}}>
          <Menu color="blue" widths={3}>
            <Menu.Item
              name='positive'
              active={res === 'positive'}
              onClick={() => setRes('positive')}
            >
              Positive
            </Menu.Item>

            <Menu.Item
              name='negative'
              active={res === 'negative'}
              onClick={() => setRes('negative')}
            >
              Negative
            </Menu.Item>

            <Menu.Item
              name='inconclusive'
              active={res === 'inconclusive'}
              onClick={() => setRes('inconclusive')}
            >
              Inconclusive
            </Menu.Item>
          </Menu>
          </div>
          </Form.Field>


        {pcContext.loading ?
          <Message color="blue" style={{marginTop:30}} >
            <Message.Header>
              Please Do Not Refresh
            </Message.Header>
            <div>
              We are posting this transaction on Kadena mainnet
            </div>
          </Message>
        : <div></div>}

        <div>

          <Button
              style={{
                backgroundColor: "#054F9E",
                color: "white",
                width: 240,
                marginTop: 20
                }}
              onClick={() => pcContext.endTest(props.pubKey, props.privKey, props.chainId, res)}
              disabled={(res === "")}
              loading={pcContext.loading}
            >
            Post Test Result
          </Button>

        </div>
        </div>
      : <div> </div>)}
        {(pcContext.txStatus === "success"
          ? <div style={{marginTop: 20}}>
              <TXSuccess title="ended" chainId={props.chainId} />
            </div>
          : (pcContext.txStatus === "failure"
          ? <div style={{marginTop: 20}}>
              <TXError/>
            </div>
          : <div></div>))}
    </div>
  )

}

export default EndRecord
