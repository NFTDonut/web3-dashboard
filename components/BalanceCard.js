import styles from '../styles/Home.module.css'

export default function BalanceCard({NFTs, bal, wallet, setWalletAddress, fetchNFTs, handleSubmit}) {

    return(
        <div className={styles.card}>
            <div className={styles.walletCardTitle}>
                <h1>Wallet Data:</h1>
            </div>
            <div className={styles.walletCardContent}>
                {/* <form method="post" className={styles.interaction} onSubmit={handleSubmit}>
                    <input id="address" name="address" type="text" placeholder='Enter a Wallet Address'></input>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form> */}
                <div className={styles.interaction}>
                    <input id="address" name="address" type="text" placeholder='Enter a Wallet Address' onChange={(e) => setWalletAddress(e.target.value)} value={wallet}></input>
                    <button className={styles.submitButton} onClick={
                        () => {
                            fetchNFTs();
                        }
                    }>Submit</button>
                </div>
                <h3>Balance (ETH):</h3>
                <div className={styles.bal}>
                    <h2>{bal}</h2>
                </div>
                <h3>NFTs Owned:</h3>
                <div className={styles.nfts}>
                    
                    {
                        NFTs.length && NFTs.map(nft => {
                            if (nft.title) {
                                return (
                                    <div className={styles.nft}>
                                        <img src={nft.media[0].gateway} className={styles.nftImg}></img>
                                        <p>{nft.title}</p>
                                    </div>
                                )
                            } else {
                                console.log("No nft data available");
                            }
                        })
                    }
                    {
                        // nftArray.length && nftArray.map(nft => {
                        //     <img src={nft.media[0].gateway} style={{ width: '100px'}}></img>
                        // })
                    }

                    {/* <img src={nft.media[0].gateway} style={{ width: '100px'}}></img> */}
                    {/* <img src={nftArray} style={{ width: '100px'}}></img> */}
                    {
                        // NFTs.length && NFTs.map(nft => {
                        //     <p>{nft.title}</p>
                        // })
                    }
                    
                </div>
            </div>
        </div>
    );


}