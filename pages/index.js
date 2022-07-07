import Head from 'next/head'
import { ethers, utils } from 'ethers'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import GasCard from '../components/GasCard'
import PriceCard from '../components/PriceCard'
import BalanceCard from '../components/BalanceCard'



export default function Home({gas, eth}) {

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
          <BalanceCard />
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