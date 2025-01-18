import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { FC, useEffect } from "react";
import { setAppToken } from "../../slices/auth";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useLazyCheckUserQuery } from "../../apis/user/user";

const Auth: FC = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkUser, { data }] = useLazyCheckUserQuery();


  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ['api://018594b5-6694-45d6-8380-9c5f078d042f/u-invetory-test'], // Додайте потрібні дозволи
      });
      console.log("Login successful!", loginResponse);
      dispatch(setAppToken(loginResponse.accessToken))
      await checkUser();
      navigate('/inventory')


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
    <button onClick={handleLogin}>Login with Microsoft</button>
    <button onClick={() => getToken(instance, accounts)}>test</button>

  </>;
}

export default Auth;