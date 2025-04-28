"use client";
import Link from 'next/link'
import styles from './header.module.css'
import { useState } from 'react';
import { GrTechnology } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
interface NavbarProps {
    isAdmin: boolean
}

const Navbar = ({ isAdmin }: NavbarProps) => {
    // const token = cookies().get("jwtToken")?.value || "";
    // const user = verifyTokenForPage(token);
    const [toggle, setToggle] = useState(false);
    return (
        <nav className={styles.vanbar}>
            <div>
                <Link href="/" className={styles.logo}>
                    GLOUD
                    <GrTechnology />
                    HOSTING
                </Link>
                <div className={styles.menu}>
                    {toggle ? <MdClose onClick={() => setToggle(prev => !prev)} /> : <GiHamburgerMenu onClick={() => setToggle(prev => !prev)} />}
                </div>
            </div>
            <div
                className={styles.navbarLinksWrapper}
                style={{
                    clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
                }}
            >
                <ul className={styles.navLinks}>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/">Home</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/artical?pageNumber=1">articles</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/about">About</Link>

                    {isAdmin && (< Link onClick={() => setToggle(false)} className={styles.navLink} href="/admin">Admin</Link>)}
                </ul>
            </div>
        </nav >
    )
}

export default Navbar