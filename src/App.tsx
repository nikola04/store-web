import { Route, Routes } from "react-router"
import ProtectedRoute from "./components/navigation/ProtectedRoute"
import Home from "./pages/Home"
import GameCategory from "./pages/category/GameCategory"
import Account from "./pages/account/Account"
import Cart from "./pages/cart/Cart"
import NavLayout from "./components/layout/NavLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AuthLayout from "./components/layout/AuthLayout"
import { AuthProvider } from "./providers/Auth"

function App() {
    return <AuthProvider>
        <Routes>
            <Route element={<NavLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/category/games" element={<GameCategory />} />
                <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
                <Route path="/cart" element={<Cart />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
            </Route>
        </Routes>
    </AuthProvider>
}

export default App
