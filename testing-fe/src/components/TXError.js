import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader } from 'semantic-ui-react';
import PactCallContext from '../contexts/PactCallContext'

const TXError = (props) => {

  const pcContext = useContext(PactCallContext);

  return (
    <div>
      <Message color='red'>
        <Message.Header style={{marginBottom: 5}}>
          Blockchain Transaction Failure
        </Message.Header>
          There was an error posting the requested information on Kadena mainnet. Please try again
          <Button
              style={{
                backgroundColor: "#054F9E",
                color: "white",
                width: 240,
                marginTop: 10
                }}
              onClick={() => window.location.reload()}
            >
            Try Again
          </Button>
      </Message>
    </div>
  );

}

export default TXError;
