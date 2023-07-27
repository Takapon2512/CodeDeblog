import React, { useEffect } from 'react'
import Link from 'next/link'
import { 
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  NextPage 
} from 'next'
import { 
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
  useRecoilState
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
import { Tags } from '@/components/Tags/tags'
import { Pagination } from '@/components/Pagination/Pagination'

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
  const tagsData = await client.get({ endpoint: 'tag' })

  return {
    props: {
      blogs: blogData.contents,
      categories: categoriesData.contents,
      tags: tagsData.contents
    }
  }
}

type Props = {
  blogs: Blog[],
  categories: Category[],
  tags: Tag[]
}

const CategoryId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs, categories, tags
}: Props) => {
  //Recoil
  const [category, setCategory] = useRecoilState(CategoryState)
  let categoryData: Category = {
    id: '',
    category: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    revisedAt: ''
  }

  if (typeof localStorage !== 'undefined') {
    const jsonGetCategory = localStorage.getItem('category') || ''
    const getCategory: Category = JSON.parse(jsonGetCategory)
    categoryData = getCategory
  }

  //カテゴリーに一致した記事のみ抽出する
  const prevBlogs = [...blogs]
  const filterBlogs = prevBlogs.filter(blog => blog.category.map(cat => cat.id).includes(category.id))
  const filterBlogsCount = filterBlogs.length

  useEffect(() => {
    setCategory(categoryData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <Header categories={categories} />
      <Box className={styles.category_container} component={'main'}>
        <Box className={styles.category_main}>
          <Box className={styles.category_title}>
            {category.category}
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
                          src={blog.images}
                          alt={blog.images}
                          sx={{ 
                            border: 'solid 0.5px #ccc',
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
          <Pagination totalCount={filterBlogsCount} />
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

export default CategoryId
