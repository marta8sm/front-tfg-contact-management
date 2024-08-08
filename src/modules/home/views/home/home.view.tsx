import React from 'react'
import styles from './home.module.css'
import { HomeWidget } from '@/home/widgets/home'

type HomeViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function HomeView(props: HomeViewProps) {
    return (
        <div data-testid="home-view" className={styles.container}>
            <HomeWidget />
        </div>
    )
}
