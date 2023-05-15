import Link from 'next/link'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { client } from '../../libs/client'

import { Blog, Tag, Category } from '@/types/blogType'
import { getDateStr } from '@/utils/getDateStr'

import styles from '../styles/Home.module.scss'

import { Header } from '@/components/Header/Header'
import { Profile } from '@/components/Profile/Profile'
import { Categories } from '@/components/Categories/Categories'
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

  return {
    props: {
      blogs: blogData.contents,
      categories: categoryData.contents
    }
  }
}

type Props = {
  blogs: Blog[],
  categories: Category[]
}
const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs, categories
}: Props) => {

  return (
    <>
    <Header categories={categories} />
    <Box className={styles.home_container} component={'main'}>
      <List className={styles.blog_cardlist}>
        {
          blogs.map((blog) => (
            <ListItem key={blog.id} className={styles.blog_cardlistItem}>
              <Link href={`/blog/${blog.id}`} className={styles.blog_link}>
                <Card className={styles.blog_card}>
                  {
                    blog.images ? (
                    <CardMedia
                    component='img'
                    width='100%'
                    height='186px'
                    src={`/image/${blog.images}`}
                    alt={blog.images}
                    sx={{ 
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
      <Box className={styles.sidebar}>
        <Profile />
        <Categories categories={categories} />
      </Box>
    </Box>
    <Footer />
    </>
  )
}

export default Home;