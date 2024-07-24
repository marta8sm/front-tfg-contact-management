import React from 'react'
import styles from './footer.module.css'
export type FooterWidgetProps = {}

export function FooterWidget(props: FooterWidgetProps) {
    return (
        <div data-testid="footer-widget" className={styles.container}>
            <div>
                <h1>FOOTER</h1>
            </div>
        </div>
    )
}
