export type Blog = {
    id: string,
    body: string,
    title: string,
    tags: Tag[],
    images: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string,
    category: Category[]
}

export type Tag = {
    id: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string
}

export type Category = {
    id: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string
}

export type birthdayType = {
    year: number,
    month: number,
    date: number
}