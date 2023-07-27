import React, { useEffect } from 'react'
import Link from 'next/link'
import { 
    GetStaticProps,
    InferGetStaticPropsType,
    GetStaticPaths,
    NextPage 
} from 'next'

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
import { TagState } from '@/utils/State'

  //CSS
import styles from './Tag.module.scss'

//Type
import { 
    Blog, 
    Tag, 
    Category 
} from '@/types/blogType'

import { client } from '../../../libs/client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { getDateStr } from '@/utils/getDateStr'

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
    const data = await client.get({ endpoint: 'tag' })
    const paths = data.contents.map((content: Tag) => `/tag/${content.id}`)
  
    return {
      paths,
      fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const tagsData = await client.get({ endpoint: 'tag' })
    const blogData = await client.get({ endpoint: 'blog' })
    const categoryData = await client.get({ endpoint: 'category' })
  
    return {
      props: {
        blogs: blogData.contents,
        tags: tagsData.contents,
        categories: categoryData.contents
      }
    }
}

type Props = {
    blogs: Blog[],
    tags: Tag[],
    categories: Category[]
}

const TagId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    blogs, tags, categories
}: Props) => {

  //Recoil
  const [tag, setTag] = useRecoilState(TagState)
  let tagData: Tag = {
    id: '',
    tag: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    revisedAt: ''
  }

  if (typeof localStorage !== 'undefined') {
    const jsonGetTag = localStorage.getItem('tag') || ''
    const getTag: Tag = JSON.parse(jsonGetTag)
    tagData = getTag
  }

  //記事が持っているタグと一致しているものを抽出
  const prevBlogs = [...blogs]
  const filterBlogs = prevBlogs.filter(blog => blog.tags.map(tag => tag.tag).includes(tag.tag))
  const filterBlogsCount = filterBlogs.length

  useEffect(() => {
    setTag(tagData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <>
      <Header categories={categories} />
      <Box className={styles.tag_container} component={'main'}>
          <Box className={styles.tag_main}>
              <Box className={styles.tag_title}>
                  {`# ${tag.tag}`}
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

export default TagId;
