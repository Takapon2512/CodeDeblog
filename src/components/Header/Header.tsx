import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Category } from '@/types/blogType'

import { Box ,List, ListItem } from '@mui/material'
import styles from './Header.module.scss'

//recoil
import { 
  CategoryIdState,
  CategoryState 
} from '@/utils/State'
import {
  useSetRecoilState,
  useRecoilValue
} from 'recoil'

export const Header = ({ categories }: { categories: Category[] }) => {
  const setCategory = useSetRecoilState(CategoryState)

  const onClickCategory = (category: Category) => setCategory(category)

  return (
    <>
    <Head>
      <title>Code Deblog</title>
    </Head>
    <header className={styles.header}>
      <Box className={styles.header_container}>
        <div className={styles.blog_title}>
          <Link href={'/'}>
            Code Deblog
          </Link>
        </div>
        <List className={styles.blog_categories}>
          {
            categories.map((category: Category, index: number) => (
              <Link 
              key={index} 
              href={`/category/${category.id}`} 
              onClick={() => onClickCategory(category)} >
                <ListItem className={styles.blog_category}>
                  {category.category}
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Box>
    </header>
    </>
  )
}
