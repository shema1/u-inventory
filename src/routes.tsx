import { FC } from "react";
import { useAuthorizedStatus } from "./slices/auth/selectors";
import { Route, Routes } from "react-router-dom";
import Users from "./Pages/Users";
import Inventory from "./Pages/Inventory";
import IvitedUsers from "./Pages/IvitedUsers";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Roles from "./Pages/Roles";
import UserPendingPage from "./Pages/UserPendingPage";
import UserBannedPage from "./Pages/UserBannedPage";




const AppRoutes: FC = () => {

    const authType = useAuthorizedStatus();

    console.log("authType", authType)

    // useEffect(() => {
    //     console.log("woork", token)
    //     if (token && authType === 'logout') {
    //         console.log("woork1")
    //         dispatch(setAuthorizedStatus('success'))
    //     }
    // }, [token, authType])


    // useEffect(() => {
    //     console.log("authType", authType)
    // }, [authType])

    if (authType === null) {
        return (
            <Routes>

                {/* <Route path='*' element={<Auth />} /> */}
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='*' element={<Login />} />
            </Routes>
        )
    }

    if (authType === 'active') {
        console.log("success")

        return (
            <Routes>
                <Route path='/users' element={<Users />} />
                <Route path='/roles' element={<Roles />} />

                <Route path='/invitedusers' element={<IvitedUsers />} />

                <Route path='/inventory' element={<Inventory />} />
                <Route path='*' element={<Inventory />} />
            </Routes>

        )
    }

    if (authType === 'pending') {
        return (
            <Routes>
                <Route path='*' element={<UserPendingPage />} />
            </Routes>
        )
    }

    if (authType === 'banned') {
        return (
            <Routes>
                <Route path='*' element={<UserBannedPage />} />
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