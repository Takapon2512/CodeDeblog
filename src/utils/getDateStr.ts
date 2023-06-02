export const getDateStr = (date: string) => {
    return new Date(date).toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo'
    })
}