import Link from 'next/link'
import styles from './header.module.css'
import Navbar from './Navbar'
import { IoPersonAddOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';

const Header = async() => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    const user = verifyTokenForPage(token);
    return (
        <header className={styles.header}>
            <Navbar isAdmin={user?.isAdmin || false} />
            <div className={styles.right}>
                {user ? (
                    <>
                        <strong className='text-blue-800 md:text-xl capitalize'>
                            {user?.firstName}
                        </strong>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link className={styles.btn} href="/login">
                            <LuLogIn className='mr-2' /> Login
                        </Link>
                        <Link className={styles.btn} href="/register">
                            <IoPersonAddOutline className='mr-2' /> register
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header