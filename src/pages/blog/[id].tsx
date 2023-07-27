import React from 'react'
import { 
    GetStaticProps, 
    GetStaticPaths, 
    InferGetStaticPropsType, 
    NextPage 
} from "next";
import Link from 'next/link';
import { client } from "../../../libs/client";
import type { Blog, Category, Tag } from "@/types/blogType";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'; 
import Image from 'next/image';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

//recoil
import { useSetRecoilState } from 'recoil'
import { CategoryState, TagState } from '@/utils/State';

//外部ファイルの関数
import { getDateStr } from '@/utils/getDateStr';

//コンポーネント
import { Header } from '@/components/Header/Header';
import { Author } from '@/components/Author/Author';
import { Footer } from '@/components/Footer/Footer';
import { Profile } from '@/components/Profile/Profile';
import { Categories } from '@/components/Categories/Categories';
import { Tags } from '@/components/Tags/tags';

//Mui
import { 
    Box, 
    Typography, 
    List, 
    ListItem 
} from '@mui/material';

//MUIIcon
import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderIcon from '@mui/icons-material/Folder';

//CSS
import styles from './article.module.scss'
import 'highlight.js/styles/hybrid.css';

//ページ上限
const perPage = 6

//APIリクエストを行うパスを指定
export const getStaticPaths: GetStaticPaths<Params> =  async () => {
    const data = await client.get({ endpoint: 'blog' })
    const paths = data.contents.map((content: Blog) => `/blog/${content.id}`)

    return { paths, fallback: false }
}

//micocmsへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const id = context.params?.id
    const data = await client.get({ endpoint: 'blog', contentId: id })
    const categoriesData = await client.get({ endpoint: 'category'})
    const tagsData = await client.get({ endpoint: 'tag' })

    //コードハイライトの処理（公式より）
    const $ = cheerio.load(data.body)
    $('pre code').each((_: number, elm: cheerio.Element) => {
        const result = hljs.highlightAuto($(elm).text())
        $(elm).html(result.value)
        $(elm).addClass('hljs')
    })

    return {
        props: {
            blog: data,
            categories: categoriesData.contents,
            tags: tagsData.contents,
            highlightedBody: $.html()
        }
    }
}

//Propsの型
type Props = {
    blog: Blog,
    categories: Category[],
    tags: Tag[],
    highlightedBody: any
}

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    blog, categories, tags, highlightedBody
}: Props) => {
    const setCategory = useSetRecoilState(CategoryState)
    const onClickCategory = (category: Category) => setCategory(category)

    const setTag = useSetRecoilState(TagState)
    const onClickGetTag = (tag: Tag) => setTag(tag)

    return (
        <>
        <Header categories={categories} />
        <Box className={styles.main_wrapper}>
            <Box className={styles.main_container} component={'main'}>
                <Box className={styles.article_headinfo}>
                    <List className={styles.article_headCategories}>
                        <FolderIcon className={styles.article_categoryIcon} />
                        {
                            blog.category.map((category: Category, index: number) => (
                                <Link 
                                key={index} 
                                href={`../category/${category.id}`} 
                                onClick={() => onClickCategory(category)}
                                >
                                    <ListItem className={styles.article_headCategory}>
                                        {category.category}
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                    <Box className={styles.article_createdAt_wrapper}>
                        <AccessTimeIcon className={styles.article_createdAt_icon} />
                        <Typography className={styles.article_createdAt}>
                            {getDateStr(blog.publishedAt)}
                        </Typography>
                    </Box>
                </Box>
                <Image 
                src={blog.images}
                alt={`${blog.title}`}
                width={400}
                height={260}
                className={styles.article_thumbnail}
                />
                <List className={styles.article_tag}>
                        <SellIcon className={styles.article_tag_icon} />
                        {
                            blog.tags.map((tag: Tag) => (
                                <ListItem key={tag.id} className={styles.article_tagItem}>
                                    <Link 
                                    href={`../tag/${tag.id}`} 
                                    onClick={() => onClickGetTag(tag)}
                                    >
                                        #{tag.tag}
                                    </Link>
                                </ListItem>
                            ))
                        }
                    </List>
                <Typography variant='h1' className={styles.article_h1title}>
                    {blog.title}
                </Typography>
                <div 
                dangerouslySetInnerHTML={{
                    __html: highlightedBody
                }} //`${blog.body}`
                className={styles.article_paragraph}
                />
                <Author />
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

export default BlogId;
