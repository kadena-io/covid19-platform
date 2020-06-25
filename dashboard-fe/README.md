# Covid-19 Dashboard

## description

Welcome to Kadena's [Covid-19 Testing Dashboard](https://covid19-dashboard.chainweb.com/)!

This is a sister repo to our [testing portal](https://github.com/kadena-io/covid19-kda) and is intended for Covid-19 Test manufacturers and distributors to register and print QR codes for test verification and tracking.

Adherent manufacturers or distributors will have to register with our platform in order to be authorized to register and print QR codes. For testing purposes, you can just click the 'Use Testnet Keypair' button provided on the dashboard. This is a printing account that is already registered to perform the desired actions.

The application is scaled to use all of Kadena's 10-chain architecture and can process up to 50,000 tests to be printed at one block height in less than 2 minutes!

The QR codes generated contain public and private keys of a test account with KDA balance of 0 and can self-sign transactions when scanned from our [testing portal](https://covid19-test.chainweb.com/). This 'magic' is made possible by Kadena's novel approach of using gas-stations to remove the friction between writing a simple blockchain app and having to onboard a user to cryptocurrencies, wallets, and all the surrounding nuances.


## test distributors
1. go to our testing dashboard [website](https://covid19-dashboard.chainweb.com/)
2. fill in form with test information and label amount
3. upload keypair authorized to print (for testing purposes click 'use testnet keypair')
4. wait for QRs to be generated and registered
5. unzip downloaded directory with the amount of QRs required
6. apply one on each test entity wants to verify
7. ensure clinicians use our testing portal [website](https://covid19-test.chainweb.com/) and follow the instructions [here](https://github.com/kadena-io/covid19-kda)


## developers

make sure you have node.js installed (should be version agnostic)

then run:
- `$ npm install`
- `$ npm start`

mobile web app will be served on localhost:8080
