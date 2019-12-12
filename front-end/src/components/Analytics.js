import React from 'react';
import styles from "../CSS/Analytics.module.css";

export default function Analytics(props) {

    console.log(props);

    return (
        <>
            <div className={styles.AnalyticsElement}>
                <div className={styles.Graph1}>
                    Graph1
                </div>
            </div>
            <div className={styles.AnalyticsElement}>
                <div className={styles.Graph1}>
                    Graph2
                </div>
            </div>
            <div className={styles.AnalyticsElement}>
                <div className={styles.Graph1}>
                    Graph3
                </div>
            </div>
            <div className={styles.AnalyticsElement}>
                <div className={styles.Graph1}>
                    Graph3
                </div>
            </div>
        </>
    )
}
