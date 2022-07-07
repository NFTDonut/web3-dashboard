import styles from '../styles/Home.module.css'

export default function GasCard({gas}) {

    return(
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                <h1>Gas Price (Gwei):</h1>
            </div>
            <div className={styles.cardContent}>
                <h2>{gas}</h2>
            </div>
        </div>
    );


}