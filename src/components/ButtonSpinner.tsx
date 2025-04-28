import React from 'react'
import styles from '@/app/LoadingSpinner.module.css';
const ButtonSpinner = () => {
    return (
        <div className={styles.spinner2}>
            <svg
                width="30"
                height="30"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svg}
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className={styles.circle2}
                />
            </svg>
        </div>
    )
}

export default ButtonSpinner