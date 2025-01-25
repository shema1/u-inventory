import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { FC, useEffect } from "react";
import { setAppToken, setUserInfo } from "../../slices/auth";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useLazyCheckUserQuery } from "../../apis/user/user";
import { IUser } from "../../apis/user/interfaces";
import { Button, Image } from "antd";
import micorsoftLogo from "../../assets/micorsoft.png";
const Auth: FC = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkUser] = useLazyCheckUserQuery();


  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ['api://018594b5-6694-45d6-8380-9c5f078d042f/u-invetory-test'], // Додайте потрібні дозволи
      });
      console.log("Login successful!", loginResponse);
      dispatch(setAppToken(loginResponse.accessToken))

      checkUser().then((res) => {
        console.log("res.data", res.data)
        res.data && dispatch(setUserInfo(res.data as IUser))
        navigate('/inventory')
      });

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const getToken = async (msalInstance: any, accounts: any) => {
    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes: ['api://018594b5-6694-45d6-8380-9c5f078d042f/u-invetory-test'], // Дозволи, потрібні для токена
        account: accounts[0],  // Перший обліковий запис із кешу (поточний користувач)
      });

      console.log("Access Token:", response.accessToken);
      return response.accessToken; // Повертає токен
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // Якщо неможливо отримати токен без взаємодії
        console.error("Token acquisition requires user interaction:", error);
      } else {
        console.error("Error acquiring token silently:", error);
      }
    }
  };


  return <>
    {/* <button onClick={handleLogin}>Login with Microsoft</button>
    <button onClick={() => getToken(instance, accounts)}>test</button> */}

    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', }}>

      <div style={{
        width: 350,
        height: 300,
        background: '#d5d5e4',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: 22,
        alignItems: 'center'
      }}>
        <Image src={micorsoftLogo} width={80} />
        <div style={{marginTop: 20, marginBottom: 50, textAlign: 'center'}}>Увійдіть у свій обліковий запис з допомогою Micorsoft</div>
        <Button onClick={handleLogin} type='primary' style={{fontWeight: 'bold'}}>Login with Microsoft</Button>
      </div>

    </div>

  </>;
}

export default Auth;