import styles from '../styles/Home.module.css'

export default function BalanceCard() {

    return(
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                <h1>Balance (ETH):</h1>
            </div>
            <div className={styles.cardContent}>
                <input placeholder='Wallet Address'></input>
                <h2>Hi</h2>
            </div>
        </div>
    );


}