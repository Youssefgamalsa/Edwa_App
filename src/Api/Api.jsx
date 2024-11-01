export const BASE_URL="https://api.aqaryminya.com/api";
export const BASE_USERS=`${BASE_URL}/auth`
export const USERS_URL={
    register:`${BASE_USERS}/signup`,
    login:`${BASE_USERS}/signin`,
    forgetPassword:`${BASE_USERS}/forgetpassword`,
    changePassword:`${BASE_USERS}/changepassword`,
    verfiy:`${BASE_USERS}/verfiy`,
}

export const ADDMODULE_URL={
    build:`${BASE_URL}/property`,
    land:`${BASE_URL}/property`,
}