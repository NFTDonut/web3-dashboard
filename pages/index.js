import Head from 'next/head'
import { ethers, utils } from 'ethers'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import GasCard from '../components/GasCard'
import PriceCard from '../components/PriceCard'
import BalanceCard from '../components/BalanceCard'



export default function Home({getServerSideProps}) {

  getServerSideProps;
  
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


export async function getServerSideProps() {

  console.log(process.env.ALCHEMY_API);

  const alchemy_api = process.env.ALCHEMY_API;
  const etherscan_api = process.env.ETHERSCAN_API;

  const provider = new ethers.providers.AlchemyProvider("homestead", alchemy_api);
  const etherscanProvider = new ethers.providers.EtherscanProvider("homestead", etherscan_api);

  console.log(provider);
  console.log(etherscanProvider);
  // const getValues = async () => {
  //   gasPrice = await provider.getGasPrice();
  //   gasPriceFormatted = utils.formatUnits(gasPrice, "gwei");
  //   console.log(gasPriceFormatted);
  // }

  // getValues();

  return {
    props: {
      hello: 'world'
    }
  }

}