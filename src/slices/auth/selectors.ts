import { useAppSelector } from "../../store/hooks";

export const useAppToken = () => useAppSelector(
  (state) => state.authActions.token)



export const useAuthorizedStatus = () => useAppSelector(
  (state) => state.authActions.isAuthorized)
