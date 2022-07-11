import styles from '../styles/Home.module.css'

export default function BalanceCard({NFTs, bal, wallet, setWalletAddress, fetchNFTs, handleSubmit}) {

    async function getMediaType(media) {
        return fetch(media, { method: 'HEAD' }).then(response => response.headers.get('Content-type'));
    }

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

                                // check content type
                                getMediaType(nft.media[0].gateway).then(type => {
                                    console.log(type);
                                });

                                if(nft.media[0].gateway) {
                                    return (
                                        <div className={styles.nft}>
                                            <img src={nft.media[0].gateway} className={styles.nftImg}></img>
                                            <p>{nft.title}</p>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className={styles.nft}>
                                            <video className={styles.nftImg}>
                                                <source src={nft.media[0].gateway}></source>
                                            </video>
                                            <p>{nft.title}</p>
                                        </div>
                                    )
                                }
                            } else {
                                console.log("No nft data available");
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );


}