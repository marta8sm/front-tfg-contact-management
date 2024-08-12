import React from 'react'
import styles from './home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export type HomeWidgetProps = {}

export function HomeWidget(props: HomeWidgetProps) {
    return (
        <div data-testid="home-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome to</h1>
                <Link href="https://www.axpe.com/" target="_blank">
                    <Image
                        className={styles.logo}
                        src="/logo-long-black.png"
                        alt="Logo"
                        width={258}
                        height={67}
                    />
                </Link>
                <h1 className={styles.title}>
                    contact management application!
                </h1>
            </div>
            <div className={styles.card_container}>
                <Link href="/clients">
                    <div className={styles.card}>
                        <h3>CLIENTS</h3>
                    </div>
                </Link>
                <Link href="/contacts">
                    <div className={styles.card}>
                        <h3>CONTACTS</h3>
                    </div>
                </Link>
                <Link href="/employees">
                    <div className={styles.card}>
                        <h3>EMPLOYEES</h3>
                    </div>
                </Link>
                <Link href="/meetings">
                    <div className={styles.card}>
                        <h3>MEETINGS</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}
