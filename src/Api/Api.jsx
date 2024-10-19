export const BASE_URL="https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api";
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