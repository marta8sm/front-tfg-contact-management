import React, { useState } from 'react'
import styles from './header.module.css'
import { AccountWidget } from '@/auth/widgets/account'
import Link from 'next/link'
import Image from 'next/image'

export type HeaderWidgetProps = {}

export function HeaderWidget(props: HeaderWidgetProps) {
    const [openMenu, setOpenMenu] = useState(false)

    //Control of the state of the mobile menu
    const mobileMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <div data-testid="header-widget" className={styles.container}>
            <div className={styles.logo}>
                <Link href="/" className="text-primary">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        width={90}
                        height={42}
                    />
                </Link>
            </div>
            <div className={styles.navbar}>
                <div className={styles.menu_item}>
                    <Link href="/clients">
                        <h3>CLIENTS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/contacts">
                        <h3>CONTACTS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/employees">
                        <h3>EMPLOYEES</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/meetings">
                        <h3>MEETINGS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/roles">
                        <h3>ROLES</h3>
                    </Link>
                </div>
            </div>
            <div className={styles.account}>
                <AccountWidget className="ml-auto" />
            </div>
            <button className={styles.menu_button} onClick={mobileMenu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            {openMenu && (
                <div
                    className={`${styles.mobile_menu} ${styles.mobile_menu_open}`}
                >
                    <div className={styles.mobile_menu_item}>
                        <Link href="/clients">
                            <h3>CLIENTS</h3>
                        </Link>
                    </div>
                    <div className={styles.mobile_menu_item}>
                        <Link href="/contacts">
                            <h3>CONTACTS</h3>
                        </Link>
                    </div>
                    <div className={styles.mobile_menu_item}>
                        <Link href="/employees">
                            <h3>EMPLOYEES</h3>
                        </Link>
                    </div>
                    <div className={styles.mobile_menu_item}>
                        <Link href="/meetings">
                            <h3>MEETINGS</h3>
                        </Link>
                    </div>
                    <div className={styles.mobile_menu_item}>
                        <Link href="/roles">
                            <h3>ROLES</h3>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
