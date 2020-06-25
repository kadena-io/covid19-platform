import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader } from 'semantic-ui-react';
import Inputs from './Inputs';
import SuccessMsg from './SuccessMsg';
import FailureMsg from './FailureMsg';
import PartialSuccessMsg from './PartialSuccessMsg';
import PactContext from '../contexts/PactContext';


function Home() {

  const pactContext = useContext(PactContext);

  return(
    <div>
    <Grid columns={1} verticalAlign="top">
      <Grid.Column>
        <Grid.Row>
          <div style={{backgroundColor: "#054F9E", height: 90}}>
            <Grid.Row >
            <img src={require("../assets/kadena.png")} style={{height:50, marginRight: 0, marginTop: 17, marginLeft: 80, float:"left"}}/>
            <div >
              <div style={{backgroundColor: "#054F9E", color: "#054F9E"}}>i</div>
              <Header as='h1'  textAlign='center' style={{marginRight: 200, marginTop: 0, color:"white", fontSize: 40}}>
                Covid-19 Test Label Dashboard
              </Header>
            </div>
            </Grid.Row>
          </div>
        </Grid.Row>
        <Grid.Row>
          {(pactContext.txStatus === "" ? <Inputs />
          : (pactContext.txStatus === "success" ? <SuccessMsg /> : (pactContext.txStatus === "failure" ? <FailureMsg /> : <PartialSuccessMsg />)))}
        </Grid.Row>
      </Grid.Column>
    </Grid>
    </div>

  )

}

export default Home;
