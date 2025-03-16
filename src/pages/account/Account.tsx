import Container from "../../components/layout/Container";
import { useAuth } from "../../hooks/Auth";

function Account(){
    const { user } = useAuth();
    return <Container>
        <h1>Account</h1>
        <p>{ JSON.stringify(user) }</p>
    </Container>
}

export default Account;
