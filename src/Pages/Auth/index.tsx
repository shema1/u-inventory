import { useMsal } from "@azure/msal-react";
import { FC } from "react";

const Auth: FC = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read"], // Додайте потрібні дозволи
      });
      console.log("Login successful!", loginResponse);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <button onClick={handleLogin}>Login with Microsoft</button>;
}

export default Auth;