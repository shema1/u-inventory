import { FC, useEffect } from "react";
import { useAppToken, useAuthorizedStatus } from "./slices/auth/selectors";
import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Users from "./Pages/Users";
import Inventory from "./Pages/Inventory";
import Home from "./Pages/Home";
import { setAuthorizedStatus } from "./slices/auth";
import { useAppDispatch } from "./store/hooks";




const AppRoutes: FC = () => {

    const authType = useAuthorizedStatus();
    const token = useAppToken();
  const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("woork", token)
        if (token && authType === 'logout') {
        console.log("woork1")
        dispatch(setAuthorizedStatus('success'))
        }
    }, [token, authType])


    useEffect(() => {
        console.log("authType", authType)
    },[authType])

    if (authType === 'logout') {
        console.log("logout")
        return (
            <Routes>

                <Route path='/auth' element={<Auth />} />
                <Route path='*' element={<Auth />} />
            </Routes>
        )
    }
    if (authType === 'success') {
        console.log("success")

        return (
            <Routes>
                <Route path='/users' element={<Users />} />
                <Route path='/inventory' element={<Inventory />} />
                <Route path='*' element={<Inventory />} />
            </Routes>

        )
    }
    // if (authType === 'block') {
    //     return (
    //         <>
    //           <h1>акаунт заблоковано</h1>
    //         </>
    //     )
    // }

    // if (authType === 'delete') {
    //     return (
    //         <>
    //           <h1>акаунт видалено</h1>
    //         </>
    //     )
    // }
    return <></>
}

export default AppRoutes;