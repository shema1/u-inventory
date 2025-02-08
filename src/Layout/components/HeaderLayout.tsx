import { Header } from "antd/es/layout/layout";
import { useProfileInfo } from "../../slices/auth/selectors";
import { Button, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store/hooks";
import { clearData } from "../../slices/auth";
import { FC } from "react";



const HeaderLayoutComponent: FC = () => {
    const dispatch = useAppDispatch();
    const profileInfo = useProfileInfo();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logout = () => {
        dispatch(clearData());
    }

    return (
        <>
                <Header style={{ padding: '12px 25px', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                    <div style={{ marginRight: 20 }}>{profileInfo?.firstName + " " + profileInfo?.lastName}</div>
                    <Button onClick={logout} type="primary" icon={<LogoutOutlined/>} iconPosition='end'>
                        Вийти
                    </Button>
                </Header>
        </>
    )
}

export default HeaderLayoutComponent;