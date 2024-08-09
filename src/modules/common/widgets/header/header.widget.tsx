import React from 'react'
import styles from './header.module.css'
import { AccountWidget } from '@/auth/widgets/account'
import Link from 'next/link'
import Image from 'next/image'

export type HeaderWidgetProps = {}

export function HeaderWidget(props: HeaderWidgetProps) {
    return (
        <div data-testid="header-widget" className={styles.container}>
            <div className="flex-shrink-0 mr-16">
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
            <div className="flex-shrink-0 border-b text-primary">
                <AccountWidget className="ml-auto" />
            </div>
        </div>
    )
}
