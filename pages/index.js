import Head from 'next/head'
import { ethers, utils } from 'ethers'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import GasCard from '../components/GasCard'
import PriceCard from '../components/PriceCard'
import BalanceCard from '../components/BalanceCard'


export default function Home() {

  const ALCHEMY_API = process.env.ALCHEMY_API;
  const ETHERSCAN_API = process.env.ETHERSCAN_API;

  

  provider = new ethers.providers.JsonRpcProvider("homestead", process.env.ALCHEMY_API);
  etherscanProvider = new ethers.providers.EtherscanProvider("homestead", process.env.ETHERSCAN_API);

  const getValues = async () => {
    gasPrice = await provider.getGasPrice();
    gasPriceFormatted = utils.formatUnits(gasPrice, "gwei");
    console.log(gasPriceFormatted);
  }

  getValues();

  return (
    <div>
      <Head>
        <title>Web3 Dashboard</title>
        <meta name="Web3 Dashboard" content="Displays blockchain data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <PriceCard />
        <GasCard />
        <BalanceCard />
        <GasCard />
      </div>
    </div>
  )
}
