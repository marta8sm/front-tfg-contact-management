import React from 'react'
import styles from './client-post.module.css'

export type ClientPostProps = {}

export function ClientPost(props: ClientPostProps) {
    return <div data-testid="client-post" className={styles.container}></div>
}
