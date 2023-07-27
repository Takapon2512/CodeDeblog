import React from 'react'
import Link from 'next/link'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { client } from '../../libs/client'

//Recoil関係
import { useRecoilValue } from 'recoil'
import { PageNumState } from '@/utils/State'

import { Blog, Tag, Category } from '@/types/blogType'
import { getDateStr } from '@/utils/getDateStr'

import styles from '../styles/Home.module.scss'

import { Header } from '@/components/Header/Header'
import { Profile } from '@/components/Profile/Profile'
import { Categories } from '@/components/Categories/Categories'
import { Tags } from '@/components/Tags/tags'
import { Pagination } from '@/components/Pagination/Pagination'
import { Footer } from '@/components/Footer/Footer'

import { 
  Box, 
  List,
  ListItem,
  Card,
  Typography, 
  CardMedia
} from '@mui/material'

import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

//SSG(ビルド時にHTMLを生成する)
export const getStaticProps = async () => {

  const blogData = await client.get({ endpoint: 'blog' })
  const categoryData = await client.get({ endpoint: 'category' })
  const tagsData = await client.get({ endpoint: 'tag' })

  return {
    props: {
      blogs: blogData.contents,
      categories: categoryData.contents,
      tags: tagsData.contents,
      totalCount: blogData.totalCount
    }
  }
}

type Props = {
  blogs: Blog[],
  categories: Category[],
  tags: Tag[],
  totalCount: number
}
const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs, categories, tags, totalCount
}: Props) => {
  const contentsNum = 6
  const currentPageNum = useRecoilValue(PageNumState)
  
  const allBlogs = [...blogs]
  const displayBlogs = allBlogs.filter((blog, index) => (
    index >= contentsNum * (currentPageNum - 1) 
    && contentsNum * currentPageNum > index 
  ))

  return (
    <>
    <Header categories={categories} />
    <Box className={styles.home_row} component={'main'}>
      <Box className={styles.home_container} >
        <List className={styles.blog_cardlist}>
          {
            displayBlogs.map((blog) => (
              <ListItem key={blog.id} className={styles.blog_cardlistItem}>
                <Link href={`/blog/${blog.id}`} className={styles.blog_link}>
                  <Card className={styles.blog_card}>
                    {
                      blog.images ? (
                      <CardMedia
                      component='img'
                      width='100%'
                      height='186px'
                      src={blog.images}
                      alt={blog.images}
                      sx={{ 
                        borderRadius: '2px'
                      }}
                      />
                      ) : (<></>)
                    }
                    <Box className={styles.cardlistItem_right}>
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
                    </Box>
                  </Card>
                </Link>
              </ListItem>
            ))
          }
        </List>
        <Pagination totalCount={totalCount} />
      </Box>
      <Box className={styles.sidebar}>
        <Profile />
        <Categories categories={categories} />
        <Tags tags={tags} />
      </Box>
    </Box>
    <Footer />
    </>
  )
}

export default Home;