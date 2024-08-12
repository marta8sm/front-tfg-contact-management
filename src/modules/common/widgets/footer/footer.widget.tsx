import React from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
export type FooterWidgetProps = {}

export function FooterWidget(props: FooterWidgetProps) {
    return (
        <div data-testid="footer-widget" className={styles.container}>
            <div className={styles.logo}>
                <Link href="https://www.axpe.com/" className="text-primary">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        width={180}
                        height={84}
                        className={styles.image_size_big}
                    />
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        width={90}
                        height={42}
                        className={styles.image_size_small}
                    />
                </Link>
                <div className={styles.rights}>
                    <p>© 2024 All rights reserved</p>
                </div>
            </div>
            <div className={styles.navbar}>
                <div className={styles.menu_item}>
                    <Link href="/">
                        <h3 className={styles.menu_routes}>HOME</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/clients">
                        <h3 className={styles.menu_routes}>CLIENTS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/contacts">
                        <h3 className={styles.menu_routes}>CONTACTS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/employees">
                        <h3 className={styles.menu_routes}>EMPLOYEES</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/meetings">
                        <h3 className={styles.menu_routes}>MEETINGS</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="/roles">
                        <h3 className={styles.menu_routes}>ROLES</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
