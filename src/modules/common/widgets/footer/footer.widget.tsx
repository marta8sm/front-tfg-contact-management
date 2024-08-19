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
                        width={135}
                        height={63}
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
                        <h3 className={styles.menu_routes}>Home</h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="https://www.axpe.com/contacto/">
                        <h3 className={styles.menu_routes}>
                            Contact us (Axpe)
                        </h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="https://www.uxcale.com/contacto/">
                        <h3 className={styles.menu_routes}>
                            Contact us (Uxcale)
                        </h3>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link href="https://www.axpe.com/politica-de-privacidad/">
                        <h3 className={styles.menu_routes}>Privacy policy</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
