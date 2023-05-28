import React, { useState } from 'react'
import { 
    Box,
    Typography,
    Button
} from '@mui/material'

//Icon
import ListIcon from '@mui/icons-material/List';

import styles from './footer.module.scss'

export const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()

    //スマホ・タブレットメニュー
    const [spMenu, setSpMenu] = useState(false)

    return (
        <>
        <Box className={styles.footer_container}>
            <Typography className={styles.footer_text}>
                &copy;{year} Code Deblog
            </Typography>
        </Box>
        <Box className={styles.sp_container}>
            <Button
            onClick={() => setSpMenu(!spMenu)}
            className={styles.sp_button}
            >
                <ListIcon 
                className={styles.sp_icon}
                />
            </Button>
        </Box>
        </>
    )
}
