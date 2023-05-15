import React from 'react'
import { 
    Box,
    Typography
} from '@mui/material'

import styles from './Footer.module.scss'

export const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    return (
        <Box className={styles.footer_container}>
            <Typography className={styles.footer_text}>
                &copy;{year} Code Deblog
            </Typography>
        </Box>
    )
}
