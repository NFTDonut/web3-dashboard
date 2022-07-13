import styles from '../styles/Home.module.css'

export default function BalanceCard({errorMsg, contentType, bal, wallet, setWalletAddress, fetchNFTs, handleSubmit}) {

    return(
        <div className={styles.card}>
            <div className={styles.walletCardTitle}>
                <h1>Wallet Data:</h1>
            </div>
            <div className={styles.walletCardContent}>
                <form method="post" className={styles.interaction} onSubmit={handleSubmit}>
                    <input id="address" name="address" type="text" placeholder='Enter a Wallet Address' onChange={(e) => setWalletAddress(e.target.value)} value={wallet}></input>
                    <p id='addressError' className={styles.error}>{errorMsg}</p>
                    <button className={styles.submitButton} onClick={
                        () => {
                            fetchNFTs();
                        }
                    }>Submit</button>
                </form>
                <h3>Balance (ETH):</h3>
                <div className={styles.bal}>
                    <h2>{bal}</h2>
                </div>
                <h3>NFTs Owned:</h3>
                <div className={styles.nfts}>
                    {
                        contentType.length && contentType.map(nft => {
                                
                            if (contentType) {
                               

                                if (nft[1] === "image/gif"|| nft[1] === "image/jpeg"|| nft[1] === "image/png"|| nft[1] === "image/tiff" || nft[1] === "image/vnd.microsoft.icon"
                                || nft[1] === "image/x-icon"|| nft[1] === "image/vnd.djvu"|| nft[1] === "image/svg+xml" || nft[1] === "image/webp") {
                                    return (
                                        <div className={styles.nft}>
                                            <img src={nft[0]} className={styles.nftImg}></img>
                                        </div>
                                    )
                                }
                                else if (nft[1] === "video/mp4"|| nft[1] === "video/mpeg"|| nft[1] === "video/quicktime"|| nft[1] === "video/x-ms-wmv"
                                || nft[1] === "video/x-msvideo"|| nft[1] === "video/x-flv"|| nft[1] === "video/webm") {
                                    return (
                                        <div className={styles.nft}>
                                            <video className={styles.nftImg}>
                                                <source src={nft[0]}></source>
                                            </video>
                                        </div>
                                    )
                                }
                                else {
                                    console.log("Invalid Content-type",nft);
                                }
                            }
                            else {
                                console.log("No nft data available");
                            }

                        })
                    }
                </div>
            </div>
        </div>
    );


}