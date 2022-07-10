import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import { ethers, utils } from 'ethers'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import GasCard from '../components/GasCard'
import PriceCard from '../components/PriceCard'
import BalanceCard from '../components/BalanceCard'
    
import { Network, initializeAlchemy, getNftsForOwner } from "@alch/alchemy-sdk";

export default function Home({gas, eth}) {

  const [bal, setBal] = useState("");
  const [lastTx, setTx] = useState("");

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      address: event.target.address.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    // alert(`Is this your full name: ${result.data}`)

    const alchemy_api = process.env.ALCHEMY_API;
    const etherscan_api = process.env.ETHERSCAN_API;
  
    const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);
    const etherscanProvider = new ethers.providers.EtherscanProvider("homestead", etherscan_api);

    let balance = await provider.getBalance(result.data);
    let formattedBalance = Number(ethers.utils.formatEther(balance)).toFixed(2);
    console.log(formattedBalance);
    setBal(formattedBalance);


    // Setup: npm install @alch/alchemy-sdk
    // Github: https://github.com/alchemyplatform/alchemy-sdk-js

    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: alchemy_api, // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
      maxRetries: 10,
    };

    const alchemy = initializeAlchemy(settings);

    // Print total NFT count returned in the response:
    const nftsForOwner = await getNftsForOwner(alchemy, result.data);
    console.log(nftsForOwner);


    // gets transaction history from specified address
    // setTx("Getting latest transaction...");
    // let history = await etherscanProvider.getHistory(result.data);
    // console.log("HISTORY: " + history);
    // await etherscanProvider.getHistory(result.data).then((history) => {
    //   history.forEach((tx) => {
    //       console.log(tx);
    //   })
    //   setTx(history[history.length - 1])
    // });
  }

  // async function getWalletData() {

  //   // setAddress();
    

  //   const alchemy_api = process.env.ALCHEMY_API;
  //   const etherscan_api = process.env.ETHERSCAN_API;
  
  //   const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);
  //   const etherscanProvider = new ethers.providers.EtherscanProvider("homestead", etherscan_api);

  //   let balance = await provider.getBalance("ricmoo.eth");
  //   let formattedBalance = Number(ethers.utils.formatEther(balance)).toFixed(2);
  //   console.log(formattedBalance);
  //   setBal(formattedBalance);

  //   // gets transaction history from specified address
  //   await etherscanProvider.getHistory("0x9C656eE8e6b2B6395c92D9f7FabeaCaC322E5e1a").then((history) => {
  //     history.forEach((tx) => {
  //         console.log(tx);
  //     })
  //     setTx(history[history.length - 1])
  //   });
  //   // console.log("HISTORY: " + history[history.length - 1]);
  // }

  return (
    <div>
      <Head>
        <title>Web3 Dashboard</title>
        <meta name="Web3 Dashboard" content="Displays blockchain data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <BalanceCard bal={bal} lastTx={lastTx} handleSubmit={handleSubmit}/>
        </div>
        <div className={styles.rightContainer}>
          <PriceCard eth={eth}/>
          <GasCard gas={gas}/>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps() {

  console.log(process.env.ALCHEMY_API);

  const alchemy_api = process.env.ALCHEMY_API;
  const etherscan_api = process.env.ETHERSCAN_API;

  const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);
  const etherscanProvider = new ethers.providers.EtherscanProvider("homestead", etherscan_api);

  // get gas price
  let gasPrice = await provider.getGasPrice();
  let gasPriceFormatted = Number(utils.formatUnits(gasPrice, "gwei")).toFixed(2);
  console.log("GAS: " + gasPriceFormatted);

  let ethPrice = await etherscanProvider.getEtherPrice();
  console.log("ETH: " + ethPrice);

  return {
    props: {
      gas: gasPriceFormatted,
      eth: ethPrice,
    }
  }

}