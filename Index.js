const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { exec } = require("child_process");
var cmd=require('node-cmd');
const { stdout } = require('process')

app.get('/deployETHcontract', function (req, res) {
    
    console.log("Deploying Ethereum Contract");
    console.log("Contract Deployment take upto 2 mins...");
    let contractdata=cmd.runSync(
        `truffle migrate --reset --network ethTestnet`,
        function(err, data, stderr){
            console.log('examples dir now contains the example file along with : ',data)
            
        }
    );
    console.log(">>RAw DATA_____",contractdata);
    console.log(">>>> Contract DATA",contractdata.data);
    
    console.log(contractdata.data.replace(/['"]+/g, ''));
    res.json({
        message:"Ethereum Contract Deployed successfully...."
    })
    
})

app.get('/deployBSCcontract', function (req, res) {
    
    console.log("Deploying BSC Contract");
    console.log("Contract Deployment take upto 2 mins...");
    let contractdata=cmd.runSync(
        `truffle migrate --reset --network bscTestnet`,
        function(err, data, stderr){
            console.log('examples dir now contains the example file along with : ',data)
            
        }
    );
    console.log(">>RAw DATA_____",contractdata);
    console.log(">>>> Contract DATA",contractdata.data);
    
    console.log(contractdata.data.replace(/['"]+/g, ''));
    res.json({
        message:"BSC Contract Deployed successfully...."
    })
    
})

app.get('/getETHtokenbalance', function (req, res) {
    exec("truffle exec scripts/eth-token-balance.js --network ethTestnet", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:stdout+" tokens are in Ethereum network."
        })
    });
    
  })
  app.get('/getBSCtokenbalance', function (req, res) {
    exec("truffle exec scripts/bsc-token-balance.js --network bscTestnet", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:stdout+" tokens are in BSC network."
        })
    });
    
  })

  app.get('/transferETH-BSC', function (req, res) {
    exec("truffle exec scripts/eth-bsc-transfer.js --network ethTestnet", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        //stdout=stdout.replace(/[^0-9]/g, '')
        res.json({
            message:"Tokens are transfered"
        })
    });
    
  })


  app.listen(process.env.PORT,(err) =>{
    console.log("Nodejs is running in PORT", process.env.PORT)
})