import styles from '../styles/Home.module.css'

export default function BalanceCard({bal, lastTx, handleSubmit}) {

    return(
        <div className={styles.card}>
            <div className={styles.walletCardTitle}>
                <h1>Wallet Data:</h1>
            </div>
            <div className={styles.walletCardContent}>
                <form method="post" className={styles.interaction} onSubmit={handleSubmit}>
                    <input id="address" name="address" type="text" placeholder='Enter a Wallet Address'></input>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
                <h3>Balance (ETH):</h3>
                <div className={styles.bal}>
                    <h2>{bal}</h2>
                </div>
                <div className={styles.hash}>
                    <h3>Latest Transaction Hash:</h3>
                    <p>{lastTx.hash}</p>
                </div>
            </div>
        </div>
    );


}