import React from 'react'
import Link from 'next/link'
import { 
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  NextPage 
} from 'next'
import { 
  CategoryIdState,
  CategoryState 
} from '@/utils/State'
import { getDateStr } from '@/utils/getDateStr'

//Type
import { Tag } from '@/types/blogType'

//MUI
import { 
    Box, 
    List,
    ListItem,
    Card,
    Typography, 
    CardMedia
} from '@mui/material'

//recoil
import {
  useRecoilValue
} from 'recoil'

//CSS
import styles from './Category.module.scss'

import { Blog, Category } from '@/types/blogType'
import { client } from '../../../libs/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

//Component
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Profile } from '@/components/Profile/Profile'
import { Categories } from '@/components/Categories/Categories'

//MUIIcon
import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: 'category' })
  const paths = data.contents.map((content: Category) => `/category/${content.id}`)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categoriesData = await client.get({ endpoint: 'category' })
  const blogData = await client.get({ endpoint: 'blog' })

  return {
    props: {
      blogs: blogData.contents,
      categories: categoriesData.contents
    }
  }
}

type Props = {
  blogs: Blog[],
  categories: Category[]
}

const CategoryId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs, categories
}: Props) => {
  //カテゴリー情報を受け取る
  const getCategory = useRecoilValue(CategoryState) 

  //カテゴリーに一致した記事のみ抽出する
  const prevBlogs = [...blogs]
  const filterBlogs = prevBlogs.filter(blog => blog.category.map(cat => cat.id).includes(getCategory.id))

  return (
    <>
    <Header categories={categories} />
      <Box className={styles.category_container} component={'main'}>
        <Box className={styles.category_main}>
          <Box className={styles.category_title}>
            {getCategory.category}
          </Box>
          <List className={styles.blog_cardlist}>
            {
              filterBlogs.map((blog: Blog, index: number) => (
                <ListItem key={index} className={styles.blog_cardlistItem}>
                  <Link href={`../blog/${blog.id}`} className={styles.blog_link}>
                    <Card className={styles.blog_card}>
                      {
                        blog.images ? (
                          <CardMedia 
                          component={'img'}
                          width='100%'
                          height='auto'
                          src={`../image/${blog.images}`}
                          alt={blog.images}
                          sx={{ 
                            border: 'solid 0.5px #ccc',
                            borderRadius: '2px'
                          }}
                          />
                        ) : (<></>)
                      }
                      <Typography variant='h6' className={styles.card_title}>
                        {blog.title}
                      </Typography>
                      <List className={styles.tag_wrapper}>
                        <SellIcon className={styles.tag_icon} />
                        {
                          blog.tags.map((tag: Tag, index: number) => (
                            <ListItem key={index} className={styles.tag_item}>{`#${tag.tag}`}</ListItem>
                          ))
                        }
                      </List>
                      <Typography className={styles.posttime}>
                        <AccessTimeIcon className={styles.posttime_icon} />
                        { getDateStr(blog.publishedAt) }
                      </Typography>
                    </Card>
                  </Link>
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Box className={styles.sidebar}>
          <Profile />
          <Categories categories={categories} />
        </Box>
      </Box>
    <Footer />
    </>
  )
}

export default CategoryId
