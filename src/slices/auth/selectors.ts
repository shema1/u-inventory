import { useAppSelector } from "../../store/hooks";

export const useAppToken = () => useAppSelector(
  (state) => state.authActions.token)



export const useAuthorizedStatus = () => useAppSelector(
  (state) => state.authActions.isAuthorized)


export const useProfileInfo = () => useAppSelector(
    (state) => state.authActions.userInfo)
  