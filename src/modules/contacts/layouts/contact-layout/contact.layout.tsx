import React, { PropsWithChildren } from 'react'
import styles from './contact.module.css'

export type ContactLayoutProps = PropsWithChildren<{}>

export function ContactLayout(props: ContactLayoutProps) {
    return
    ;<div data-testid="contact-layout" className={styles.container}>
        {props.children}
    </div>
}
