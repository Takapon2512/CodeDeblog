import { atom } from 'recoil'
import { Category, Tag } from '@/types/blogType'

export const CategoryState = atom<Category>({
    key: 'CategoryState',
    default: 
    {
        id: '',
        category: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        revisedAt: ''
    }

})

export const TagState = atom<Tag>({
    key: 'TagState',
    default: {
        id: '',
        tag: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        revisedAt: ''
    }
})

export const CategoryIdState = atom({
    key: 'CategoryId',
    default: ''
})

export const PageNumState = atom<number>({
    key: 'PageNumState',
    default: 1
})

export const prevPageNumState = atom<number>({
    key: 'prevPageNumState',
    default: 1
})