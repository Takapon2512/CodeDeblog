import React, { useEffect } from 'react'

//Recoil
import { PageNumState, prevPageNumState } from '@/utils/State'
import { useSetRecoilState, useRecoilValue } from 'recoil'

//Mui
import {
    Box,
    Button
} from '@mui/material'

//Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//CSS
import styles from './pagination.module.scss'

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  const setPageNum = useSetRecoilState(PageNumState)
  const pageNum = useRecoilValue(PageNumState)

  const setPrevPageNum = useSetRecoilState(prevPageNumState)

  const perPage = 6
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
  
  //Color
  const normalColor = 'rgb(21, 60, 97)'
  const currentPageColor = 'rgb(71 69 86)'

  const onClickPageChange = (num: number) => {
    setPageNum(num)
    const el = document.getElementById(`pagination_${num}`)
    const prevEl = document.getElementById(`pagination_${pageNum}`)

    if (num !== pageNum && el !== null && prevEl !== null) {
      el.style.backgroundColor = currentPageColor
      prevEl.style.backgroundColor = normalColor

      el.setAttribute('disabled', 'true')
      prevEl.removeAttribute('disabled')

    } else if (num === pageNum && el !== null && prevEl !== null) {
      el.style.backgroundColor = normalColor
      prevEl.style.backgroundColor = currentPageColor

      prevEl.setAttribute('disabled', 'true')
      el.removeAttribute('disabled')
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPrevPageNum(num)
  }

  useEffect(() => {
    const el = document.getElementById('pagination_1')
    if (el !== null) el.style.backgroundColor = currentPageColor
  }, [])

  return (
    <Box className={styles.pagination_container}>
      {
        pageNum === 1 ? (
          <></>
        ) : (
          <Button
          className={styles.pagination_arrow}
          onClick={() => onClickPageChange(pageNum - 1)}
          >
          <ArrowBackIosNewIcon 
          className={styles.pagination_arrow_icon}
          />
            Prev
          </Button>
        )
      }
      {
        range(1, Math.ceil(totalCount / perPage)).map((num: number, index: number) => (
          
          <Button 
          key={index}
          id={`pagination_${num}`} 
          className={styles.pagination_num} 
          onClick={() => onClickPageChange(num)}
          >
            {num}
          </Button>
        ))
      }
      {
        pageNum === Math.ceil(totalCount / perPage) ? (
          <></>
        ) : (
          <Button
          className={styles.pagination_arrow}
          onClick={() => onClickPageChange(pageNum + 1)}
          >
            Next
            <ArrowForwardIosIcon 
            className={styles.pagination_arrow_icon}
            />
          </Button>
        )
      }
    </Box>
  )
}
