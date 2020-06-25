import React, { useState, useEffect, useContext } from 'react';
import { Button, Grid, Input, Icon, Form, List,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Segment, Table } from 'semantic-ui-react';
import PactCallContext from '../contexts/PactCallContext'

const History = () => {

  const pcContext = useContext(PactCallContext);

  useEffect(() => {
     // (async () => {
     //   pcContext.getSavedScans()
     // })();
     (async () => {
       pcContext.updateScans()
     })();
   }, []);

  const showDate = (item) => {
    const unix = Date.parse(item.test["last-mod-time"]["timep"])
    const d = new Date(unix)
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  }


  return (
    <Segment style={{ margin: 10 }}>
      <div style={{marginTop: 10}}>
      {pcContext.scans.length !== 0
      ?
        <Table celled textAlign='center' columns={4} compact basic padded striped>

          <Table.Header color='blue'>
            <Table.Row style={{backgroundColor: "#054F9E", opactiy: 0.8}}>
              <Table.HeaderCell style={{color:'white'}}>Model</Table.HeaderCell>
              <Table.HeaderCell style={{color:'white'}}>Brand</Table.HeaderCell>
              <Table.HeaderCell style={{color:'white'}}>Administered</Table.HeaderCell>
              <Table.HeaderCell style={{color:'white'}}>Result</Table.HeaderCell>
            </Table.Row>
          </Table.Header>


          <Table.Body>
            {(pcContext.scans.map((s, i) => {
              return (
                <Table.Row>
                  <Table.Cell>{s.test["test-manufacturer"]}</Table.Cell>
                  <Table.Cell>{s.test["test-model"]}</Table.Cell>
                  <Table.Cell negative>
                    <a href={s.url}>
                      {showDate(s)}
                    </a>
                  </Table.Cell>
                  <Table.Cell style={{color: (s.test["test-end-bh"]["int"] === 0 ? 'grey' : (s.test["result"] === 'positive' ? 'red' : 'green'))}}>
                    {(s.test["test-end-bh"]["int"] === 0 ? 'administered' : s.test["result"])}
                  </Table.Cell>
                </Table.Row>
              )
            }))}
          </Table.Body>
        </Table>
        :
        <Header as='h5'  textAlign='center' style={{color: "#054F9E", marginLeft: 40, marginBottom: 20, marginRight: 40}}>
          No Tests scanned yet!
        </Header>
        }
        <Button
            style={{
              backgroundColor: "#054F9E",
              color: "white",
              width: 160,
              marginTop: 5,
              marginBottom: 5
              }}
            loading={pcContext.loading}
            onClick={async () => await pcContext.updateScans()}
          >
          <Icon name='refresh' /> Refresh
        </Button>
      </div>
    </Segment>
  )

}

export default History;
