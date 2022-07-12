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

export default function Home({gas, eth}) {

  const [wallet, setWalletAddress] = useState("");
  const [bal, setBal] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [contentType, setContentType] = useState([]);
  

  const fetchNFTs = async () => {
    setNFTs([]);
    setContentType([]);

    //map through NFTs, fetch content-type, build array
    // NFTs.length && NFTs.map(nft => {
    //     console.log(nft.media[0].gateway);
    // })
    
  // Stop the form from submitting and refreshing the page.

    let nfts;
    console.log("Fetching nfts...");
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API}/getNFTs/`;

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const fetchURL = `${baseURL}?owner=${wallet}`;
    
    nfts = await fetch(fetchURL, requestOptions).then(data => data.json()); 

    if(nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);


      // map through NFTs, fetch content type, and define array
      nfts.ownedNfts.length && nfts.ownedNfts.map(nft => {
        fetch(nft.media[0].gateway, { method: 'HEAD' })
        .then(response => {
          console.log(nft.media[0].gateway);
          console.log("TYE: " + response.headers.get('Content-Type'));
          // setContentType(response.headers.get('Content-Type'));
          setContentType( arr => [...arr, [nft.media[0].gateway, response.headers.get('Content-Type')]]);
        });
      })


    }

  }

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
  
    const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);

    let balance = await provider.getBalance(result.data);
    let formattedBalance = Number(ethers.utils.formatEther(balance)).toFixed(2);
    console.log(formattedBalance);
    setBal(formattedBalance);

  }

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
          <BalanceCard contentType={contentType} NFTs={NFTs} bal={bal} wallet={wallet} setWalletAddress={setWalletAddress} fetchNFTs={fetchNFTs} handleSubmit={handleSubmit}/>
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