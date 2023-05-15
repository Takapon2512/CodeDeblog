import React from 'react'
import Image from 'next/image'
import { birthdayType } from '@/types/blogType'

//外部関数
import { getAge } from '@/utils/getAge'

//CSS
import styles from './Author.module.scss'

//MUI
import { 
    Box,
    Typography
} from '@mui/material'

export const Author = () => {
    const mybirthday: birthdayType = {
        year: 1997,
        month: 9,
        date: 24
    }
    
    return (
        <Box className={styles.author}>
            <Image 
            src={`/image/takapon_image.jpg`}
            alt='Takayuki'
            width={72}
            height={72}
            className={styles.author_image}
            />
            <Box className={styles.author_textbox}>
                <Typography className={styles.author_name}>
                    Takayuki
                </Typography>
                <Typography className={styles.author_text}>
                    IT業界4年目で、現在は運用監視オペレータとして勤務している{getAge(mybirthday)}歳の会社員です。 
                </Typography>
                <Typography className={styles.author_text}>
                    これまではフリーランスや派遣のWebデザイナーやライターとして勤務していました。
                </Typography>
                <Typography className={styles.author_text}>
                    本ブログではこれまでに得た知見や学習中のプログラミングについての発信をしていきます。
                </Typography>
            </Box>
        </Box>
    )
}
