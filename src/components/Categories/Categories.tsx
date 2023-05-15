import React from 'react'
import Link from 'next/link'

//recoil
import {
    useSetRecoilState
} from 'recoil'
import { CategoryState } from '@/utils/State'

//Type
import { Category } from '@/types/blogType'

//Mui
import {
    Box,
    List,
    ListItem,
    Typography
} from '@mui/material'

//CSS
import styles from './Categories.module.scss'

export const Categories = ({ categories }: { categories: Category[] }) => {
    const setCategory = useSetRecoilState(CategoryState)
    const onClickCategory = (category: Category) => setCategory(category)

    return (
        <Box className={styles.categories_container}>
            <Typography className={styles.categories_cardtitle}>
                Categories
            </Typography>
            <List className={styles.categories_list}>
                {
                    categories.map((category: Category, index: number) => (
                        <ListItem key={index} className={styles.categories_listitem}>
                            <Link 
                            href={`../category/${category.id}`}
                            onClick={() => onClickCategory(category)}
                            >
                                {category.category}
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}
