import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment } from 'semantic-ui-react';
import PactCallContext from '../contexts/PactCallContext'
import QRScan from './QRScan'
import Welcome from './Welcome'
import QRPatient from './QRPatient';
import History from './History';
import PatientLanding from './PatientLanding';

const Home = () => {

  const pcContext = useContext(PactCallContext);

  useEffect(() => {
     (async () => {
       pcContext.getSavedScans()
     })();
     // (async () => {
     //   pcContext.updateScans()
     // })();
   }, []);

  const showPage = () => {
    if (pcContext.screen === 'welcome') {
      return <Welcome />
    } if (pcContext.screen === 'scan') {
      return <QRScan />
    } if (pcContext.screen === 'scan-patient') {
      return <QRPatient />
    } if (pcContext.screen === 'history') {
      return <History />
    } if (pcContext.screen === 'patient') {
      return <PatientLanding />
    }
  }

  return (
    <Grid columns={1} verticalAlign="top">
      <Grid.Column>
        <Grid.Row>
          <div style={{backgroundColor: "#054F9E", height: 80}}>
            <Grid.Row >
            <img
              src={require("../assets/K.png")}
                onClick={() => window.location.reload()}
                style={{height:50, marginRight: 0, marginTop: 15, marginLeft: 20, float:"left"}}
            />
            <div>
              <div style={{backgroundColor: "#054F9E", color: "#054F9E"}}>i</div>
              <Header as='h1'  textAlign='center' style={{marginRight: 60, marginTop: 10, color:"white", fontSize: 20}}>
                Covid-19 Testing
              </Header>
            </div>
            </Grid.Row>
          </div>
        </Grid.Row>
        <Grid.Row>
          {showPage()}
        </Grid.Row>
      </Grid.Column>
    </Grid>

  )

}

export default Home;
