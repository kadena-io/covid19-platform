import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Button, Grid, Input, Icon, Form, List, Label,
   Modal, Header, Message, Popup, Select, Radio,
   Tab, TextArea, Loader, Menu, Dropdown } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import TXSuccess from './TXSuccess';
import TXError from './TXError';
import PactCallContext from '../contexts/PactCallContext';
import { COUNTRY_OPTIONS } from '../assets/countries.js';


console.log(COUNTRY_OPTIONS)

const InitRecord = (props) => {

  const pcContext = useContext(PactCallContext);

  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [submitPress, setSubmitPress] = useState(false);

  const ages = [
      { key: '0', value: '0-10', text: '0-10' },
      { key: '1', value: '11-20', text: '11-20' },
      { key: '2', value: '21-30', text: '21-30' },
      { key: '3', value: '31-40', text: '31-40' },
      { key: '4', value: '41-50', text: '41-50' },
      { key: '5', value: '51-60', text: '51-60' },
      { key: '6', value: '61-70', text: '61-70' },
      { key: '7', value: '71-80', text: '71-80' },
      { key: '8', value: '81-90', text: '81-90' },
      { key: '9', value: '91-100+', text: '91-100+' },
    ]

  return (
    <div>
    {(pcContext.txStatus === "" ?
      <div>
      <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 10, marginTop: 0 }}>
        Test Details
      </Header>
      <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "0px", marginBottom: 0}} >
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Test Public Key
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
            icon='key'
            iconPosition='left'
            placeholder='Public Key'
            value={props.pubKey}
            disabled={true}
          />
        </div>
      </Form.Field>

      <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "10px", marginBottom: 0}} >
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 20}}>Test Manufacturer Name
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Test Manufacturer Name</Popup.Header>
            <Popup.Content>Name of the brand that manufactures the test. Make sure the physical test matches this field</Popup.Content>
          </Popup>
        </label>
        <div>
          <Input
            style={{width:"240px", marginBottom: 3, marginTop: 5}}
            icon='building'
            iconPosition='left'
            placeholder='Manufacturer'
            value={props.brand}
            disabled={true}
          />
        </div>
      </Form.Field>

      <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "10px", marginBottom: 10}} >
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 20}}>Test Model Name
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Test Model Name</Popup.Header>
            <Popup.Content>Name or ID of the test model from the manufacturer. Make sure the physical test matches this field</Popup.Content>
          </Popup>
        </label>
        <div>
          <Input
            style={{width:"240px", marginBottom: 3, marginTop: 5}}
            icon='pencil alternate'
            iconPosition='left'
            placeholder='Model'
            value={props.model}
            disabled={true}
          />
        </div>
      </Form.Field>

      <Header as='h1'  textAlign='center' style={{color: "#054F9E", marginBottom: 10, marginTop: 30, marginTop: 0 }}>
        Patient Info Form
      </Header>
      <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
          <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Patient Name
            <Popup
              trigger={
                <Icon name='help circle' style={{"marginLeft": "2px"}}/>
              }
              position='top center'
            >
              <Popup.Header>Patient Name</Popup.Header>
              <Popup.Content>Patient First Name and Last Name</Popup.Content>
            </Popup>
          </label>
          <Input
            style={{width:"240px", marginBottom: 1, marginTop: 5}}
            icon='user'
            iconPosition='left'
            placeholder='First Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            style={{width:"240px", marginBottom: 3, marginTop: 2}}
            icon='user plus'
            iconPosition='left'
            placeholder='Last Name'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
      </Form.Field>


      <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
          <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Patient Zip Code
            <Popup
              trigger={
                <Icon name='help circle' style={{"marginLeft": "2px"}}/>
              }
              position='top center'
            >
              <Popup.Header>Patient Zip Code</Popup.Header>
              <Popup.Content>Patient residence zip code</Popup.Content>
            </Popup>
          </label>
          <Input
            style={{width:"240px", marginBottom: 1, marginTop: 5}}
            icon='thumbtack'
            iconPosition='left'
            placeholder='Zip Code'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
      </Form.Field>



      <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
          <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Patient Country
            <Popup
              trigger={
                <Icon name='help circle' style={{"marginLeft": "2px"}}/>
              }
              position='top center'
            >
              <Popup.Header>Patient Country</Popup.Header>
              <Popup.Content>Patient country of residence</Popup.Content>
            </Popup>
          </label>
          <Select
            style={{width:"240px", marginBottom: 1, marginTop: 5}}
            name="country"
            onChange={(e, { value }) => {
              console.log(value)
              setCountry(value)
            }}
            options={COUNTRY_OPTIONS}
            search
            selection
            placeholder={
              <div>
                <Icon name='globe'/>
                Country
              </div>
            }
            selectOnBlur={false}
            value={country}
          />
      </Form.Field>




    <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Patient Date of Birth
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Date of Birth</Popup.Header>
            <Popup.Content>Patient Date of Birth from identification</Popup.Content>
          </Popup>
        </label>
          <div style={{width:"240px", marginBottom: 1, marginTop: 5}}>
          <SemanticDatepicker
            style={{width:"100vw", marginBottom: 1, marginTop: 5 }}
            iconPosition='left'
            onChange={(event, data) => {
              console.log(data.value)
              setDob(data.value)
            }}
          />
          </div>
    </Form.Field>



    <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Patient Identification Number
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Patient National ID Number</Popup.Header>
            <Popup.Content>Patient identification from official government document. EX: Passport, Driver's License</Popup.Content>
          </Popup>
        </label>
        <Input
          style={{width:"240px", marginBottom: 1, marginTop: 5}}
          icon='hashtag'
          iconPosition='left'
          placeholder='ID Number'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
    </Form.Field>



      <Form.Field style={{width:"240px", margin: "0 auto", marginTop: "10px"}}>
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 10}}>Age Group
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Age Group</Popup.Header>
            <Popup.Content>Select the age range of the patient</Popup.Content>
          </Popup>
        </label>
        <Select
          style={{width:"240px", marginTop: 5}}
          placeholder='Age Group'
          options={ages}
          onChange={(e, { value }) => setAge(value)}
        />
    </Form.Field>


      <Form.Field  style={{width:"240px", margin: "0 auto", marginTop: "10px", marginBottom: 0}} >
        <label style={{color: "#054F9E", fontWeight: 'bold', marginBottom: 0}}>Gender
          <Popup
            trigger={
              <Icon name='help circle' style={{"marginLeft": "2px"}}/>
            }
            position='top center'
          >
            <Popup.Header>Gender</Popup.Header>
            <Popup.Content>Select Gender of patient</Popup.Content>
          </Popup>
        </label>
        <Menu color="blue" widths={3}>
          <Menu.Item
            name='male'
            active={sex === 'male'}
            onClick={() => setSex('male')}
          >
            Male
          </Menu.Item>

          <Menu.Item
            name='female'
            active={sex === 'female'}
            onClick={() => setSex('female')}
          >
            Female
          </Menu.Item>

          <Menu.Item
            name='other'
            active={sex === 'other'}
            onClick={() => setSex('other')}
          >
            Other
          </Menu.Item>
        </Menu>
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
                onClick={() => {
                  pcContext.administerTest(
                    props.pubKey,
                    props.privKey,
                    props.chainId,
                    age,
                    sex,
                    name,
                    surname,
                    dob,
                    id,
                    zip,
                    country
                )}}
                disabled={(sex === "" || age === "" || name === "" || id === "" || dob === "" || surname === "" || zip === "" || country === "")}
                loading={pcContext.loading}
              >
              Administer Test
            </Button>
          </div>
          </div>
        : <div> </div>)}
          {(pcContext.txStatus === "success"
            ? <div style={{marginTop: 20}}>
                <TXSuccess title="administered" chainId={props.chainId} pubKey={props.pubKey}/>
              </div>
            : (pcContext.txStatus === "failure"
            ? <div style={{marginTop: 20}}>
                <TXError/>
              </div>
            : <div></div>))}
    </div>
  )

}

export default InitRecord
