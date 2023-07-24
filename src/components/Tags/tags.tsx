import React from 'react'
import Link from 'next/link'

//recoil
import {
    useSetRecoilState
} from 'recoil'
import { TagState } from '@/utils/State'

//Type
import { Tag } from '@/types/blogType'

//Mui
import {
    Box,
    List,
    ListItem,
    Typography
} from '@mui/material'

//CSS
import styles from './tags.module.scss'

export const Tags = ({ tags }: { tags: Tag[] }) => {
    const setTag = useSetRecoilState(TagState)
    const onClickTag = (tag: Tag) => {
        setTag(tag)
    
        const jsonTag = JSON.stringify(tag)
        localStorage.setItem('tag', jsonTag)
    }

  return (
    <Box className={styles.tags_container}>
        <Typography className={styles.tags_cardtitle}>
            Tags
        </Typography>
        <List className={styles.tags_list}>
            {
                tags.map((tag: Tag, index: number) => (
                    <ListItem key={index} className={styles.tags_listitem}>
                        <Link 
                        href={`../tag/${tag.id}`}
                        onClick={() => onClickTag(tag)}
                        >
                            {tag.tag}
                        </Link>
                    </ListItem>
                ))
            }
        </List>
    </Box>
  )
}
