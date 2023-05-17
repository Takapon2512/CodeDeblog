import React from 'react'
import Link from 'next/link'

//Recoil
import { PageNumState } from '@/utils/State'
import { useSetRecoilState, useRecoilValue } from 'recoil'

//Mui
import {
    Box,
    List,
    ListItem,
    Typography
} from '@mui/material'

//CSS
import styles from './Pagination.module.scss'

export const Pagination = ({ totalCount }: { totalCount: number }) => {
    const perPage = 6
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
    const setPageNum = useSetRecoilState(PageNumState)

    const pageNum = useRecoilValue(PageNumState)
    console.log(pageNum)

    const onClickPageChange = (num: number) => setPageNum(num)

  return (
    <List className={styles.pagination_container}>
      {
        range(1, Math.ceil(totalCount / perPage)).map((num: number, index: number) => (
          <ListItem key={index} className={styles.pagination_num} onClick={() => onClickPageChange(num)}>{num}</ListItem>
        ))
      }
    </List>
  )
}
