import Container from "../../components/layout/Container";
import { useAuth } from "../../hooks/useAuth";

function AccountSettings(){
    const { user } = useAuth();
    return <Container>
        <h1>Account Settings</h1>
        <p>{ JSON.stringify(user) }</p>
    </Container>
}

export default AccountSettings;
