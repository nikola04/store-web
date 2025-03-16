import { useLocation } from "react-router";
import { allowedPlatforms } from "../../constants/allowedPlatforms";
import Container from "../../components/layout/Container";

function GameCategory() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const _platform = searchParams.get('platform');
    const platform = _platform && allowedPlatforms.includes(_platform) ? _platform : 'all';

    const search = searchParams.get('query');

    return <Container>
        <div>
            <h1 className="font-bold">Games</h1>
            <p>Platform: {platform}</p>
            <p>Searched: {search}</p>
        </div>
    </Container>
}

export default GameCategory;
