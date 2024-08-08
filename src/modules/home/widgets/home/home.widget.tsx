import React from 'react'
import styles from './home.module.css'
import Link from 'next/link'

export type HomeWidgetProps = {}

export function HomeWidget(props: HomeWidgetProps) {
    return (
        <div data-testid="home-widget" className={styles.container}>
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
