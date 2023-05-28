import React from 'react'
import { birthdayType } from '@/types/blogType'
import { getAge } from '@/utils/getAge'
import {
    Box,
    Typography,
} from '@mui/material'
import Image from 'next/image'

import styles from './profile.module.scss'

export const Profile = () => {
    //私の誕生日
    const myBirthday: birthdayType = {
        year: 1997,
        month: 9,
        date: 24
    }

    return (
        <Box className={styles.profile_container}>
            <Typography className={styles.profile_cardtitle}>
                Profile
            </Typography>
            <Image src='/image/takapon_image.jpg' alt='Takayuki' width={96} height={96} className={styles.profile_image} />
            <Typography className={styles.profile_title} variant='h6'>
                Takayuki
            </Typography>
            <Typography className={styles.profile_text}>
                1997年9月生まれで、現在{getAge(myBirthday)}歳です。
            </Typography>
            <Typography className={styles.profile_text}>
                現在はオペレーター業務に従事しながらWebアプリを開発しています。
            </Typography>
        </Box>
    )
}
