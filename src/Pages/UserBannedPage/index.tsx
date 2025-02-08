import { FC } from "react";
import { Result, Button } from "antd";
import PendingLayout from "../../Layout/PendingLayout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { clearData } from "../../slices/auth";

const UserBannedPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(clearData());
        navigate('/login');
    }

    return (
        <PendingLayout>
            <Result
                status="error"
                title="Обліковий запис заблоковано"
                subTitle="На жаль, ваш обліковий запис було заблоковано адміністратором. Якщо ви вважаєте, що це помилка, будь ласка, зв'яжіться з адміністратором системи."
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

export default UserBannedPage; 