import Nav from "./components/Navigation/Nav"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import GameCategory from "./pages/category/GameCategory"
import Account from "./pages/account/Account"
import Cart from "./pages/cart/Cart"

function App() {
    return <div className="relative bg-background w-screen max-w-full h-auto flex flex-col justify-center items-center">
        <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/category/games" element={<GameCategory/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </div>
}

export default App
