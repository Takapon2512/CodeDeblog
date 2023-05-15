import { birthdayType } from '@/types/blogType'

export const getAge = (birthday: birthdayType) => {
    //今日
    const today = new Date()
    
    //今年の誕生日
    const thisYearBirthday = new Date(today.getFullYear(), birthday.month - 1, birthday.date)

    //現在の年齢
    let age = today.getFullYear() - birthday.year

    //今年の誕生日が来ていない場合は年齢から1を引く
    if (today < thisYearBirthday) age = age - 1

    return age
}