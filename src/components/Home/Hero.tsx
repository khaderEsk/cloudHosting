import { TiTick } from 'react-icons/ti';
import CloudImage from '../../../public/cloudHosting.png'
import Image from 'next/image';
import styles from './Hero.module.css'
const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroLeft}>
                <h1 className={styles.title}>Cloud Hosting</h1>
                <p className={styles.desc}>
                    The best web hosting solution for your online success
                </p>
                <div className={styles.services} >
                    <div className={styles.servicesItem}>
                        <TiTick /> Easy To Use Control Panel
                    </div>
                    <div className={styles.servicesItem}>
                        <TiTick /> Secure Hosting
                    </div>
                    <div className={styles.servicesItem}>
                        <TiTick /> WebSite Maintenance
                    </div>
                </div>
            </div>
            <div>
                <Image
                    src={CloudImage}
                    alt='cloud'
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}

export default Hero