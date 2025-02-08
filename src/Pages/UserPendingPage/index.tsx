import { FC } from "react";
import { Result, Button } from "antd";
import PendingLayout from "../../Layout/PendingLayout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { clearData } from "../../slices/auth";

const UserPendingPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const logout = () => {
        dispatch(clearData());
        navigate('/login');
    }
    return (
        <PendingLayout>
            <Result
                status="info"
                title="Очікування підтвердження"
                subTitle="Ваш обліковий запис очікує на підтвердження адміністратором. Ми повідомимо вас електронною поштою, коли ваш акаунт буде активовано."
                extra={[
                    <Button 
                        type="primary" 
                        key="login" 
                        onClick={logout}
                    >
                        Повернутися до входу
                    </Button>
                ]}
            />
        </PendingLayout>
    );
}

export default UserPendingPage;