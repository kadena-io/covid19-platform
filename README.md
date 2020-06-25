# Covid-19 Portal

## description

Welcome to Kadena's [Covid-19 Testing Portal](https://covid19-test.chainweb.com/)!

This is a sister repo to our [testing dashboard](https://github.com/kadena-io/covid19-kda) and is intended for clinicians to administered verified tests to patients using our verified QR Codes generated in the [testing dashboard website](https://covid19-dashboard.chainweb.com). Patients can also use the same website to get a receipt of the test administered to them, and receive their test result in real-time directly from the blockchain!

Adherent test kits with the corresponding QR codes can be scanned to both administer a test and post its result directly to Kadena mainnet. The purpose of the QR codes is to combat fake or duplicate tests and to anonymously record test results with non-identifying demographic info publicly on Kadena's blockchain.

The application is scaled to use all of Kadena's 10-chain architecture and is designed to never congest the blockchain regardless of the numbers of tests that are being administered or recorded.

## walkthrough

### prerequisites
1. you must have a test with a valid QR code
2. adhering manufacturers can print them [here](https://covid19-dashboard.chainweb.com/) by following [this guide](https://github.com/kadena-io/covid19-dashboard)

### clinician

1. go to our testing portal [website](https://covid19-test.chainweb.com/)
2. click 'clinician'
3. scan the QR code on the test label
4. enter patient information and press send
5. let patient scan receipt of test administration
6. (skip steps 7-9 for platform testing)
7. administer physical test to patient
8. patient leaves premise
9. wait for test result to come in
10. scan the same QR code on the administered test
11. post test result
12. patient anonymously receives verified test result in real-time without having to visit premise again

### patient

1. follow on-premise test administration process
2. go to our testing platform [website](https://covid19-test.chainweb.com/)
3. click 'patient'
4. click 'scan new test'
5. scan administration receipt QR code clinican will show you
6. see verified test administration page
7. wait for test result to come in realtime or press refresh

## developers

make sure you have node.js installed (should be version agnostic)

then run:
- `$ npm install`
- `$ npm start`

mobile web app will be served on localhost:8080
