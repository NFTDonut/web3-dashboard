import styles from '../styles/Home.module.css'

export default function PriceCard({eth}) {

    return(
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                <h1>ETH Price (USD):</h1>
            </div>
            <div className={styles.cardContent}>
                <h2>{eth}</h2>
            </div>
        </div>
    );


}