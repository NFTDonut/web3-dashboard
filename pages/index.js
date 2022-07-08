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

  const [bal, setBal] = useState("");
  const [lastTx, setTx] = useState("");

  async function getWalletData() {
    const alchemy_api = process.env.ALCHEMY_API;
    const etherscan_api = process.env.ETHERSCAN_API;
  
    const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);
    const etherscanProvider = new ethers.providers.EtherscanProvider("homestead", etherscan_api);

    let balance = await provider.getBalance("ricmoo.eth");
    let formattedBalance = Number(ethers.utils.formatEther(balance)).toFixed(2);
    console.log(formattedBalance);
    setBal(formattedBalance);

    // gets transaction history from specified address
    await etherscanProvider.getHistory("0x9C656eE8e6b2B6395c92D9f7FabeaCaC322E5e1a").then((history) => {
      history.forEach((tx) => {
          console.log(tx);
      })
      setTx(history[history.length - 1])
    });
    // console.log("HISTORY: " + history[history.length - 1]);
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
          <BalanceCard getWalletData={getWalletData} bal={bal} lastTx={lastTx}/>
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