import styles from '../styles/Home.module.css'

export default function BalanceCard({bal, wallet, setWalletAddress, fetchNFTs, handleSubmit}) {

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
                <div className={styles.hash}>
                    <h3>Latest Transaction Hash:</h3>
                    <p></p>
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