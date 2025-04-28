"use client";
import React from 'react'
import styles from './LoadingSpinner.module.css';
const loading = () => {
    return (
        <div className={styles.spinner}>
            <svg
                width="7"
                height="7"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svg}
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className={styles.circle}
                />
            </svg>
        </div>
    )
}

export default loading