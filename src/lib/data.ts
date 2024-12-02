"use server"

import * as userApi from "./api/user.api"

export const getMe = async () => {
  return userApi.getMe()
}
