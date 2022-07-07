import styles from '../styles/Home.module.css'

export default function BalanceCard() {

    return(
        <div className={styles.card}>
            <div className={styles.walletCardTitle}>
                <h1>Wallet Data:</h1>
            </div>
            <div className={styles.walletCardContent}>
                <div className={styles.interaction}>
                    <input placeholder='Enter a Wallet Address'></input>
                    <button className={styles.submitButton}>Submit</button>
                </div>
                <div className={styles.results}>
                    <h3>Balance (ETH):</h3>
                    <h2>fs</h2>
                </div>
                <div className={styles.results}>
                    <h3>Latest Transaction:</h3>
                    <h2>gs</h2>
                </div>
            </div>
        </div>
    );


}