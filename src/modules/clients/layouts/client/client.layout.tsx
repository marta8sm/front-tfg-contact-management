import React, { PropsWithChildren } from 'react'
import styles from './client.module.css'

export type ClientLayoutProps = PropsWithChildren<{}>

export function ClientLayout(props: ClientLayoutProps) {
    return <div data-testid="client-layout" className={styles.container}>{props.children}</div>
}
