import { Route, Routes } from "react-router"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import GameCategory from "./pages/category/GameCategory"
import Account from "./pages/account/Account"
import Cart from "./pages/cart/Cart"
import NavLayout from "./components/layout/NavLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AuthLayout from "./components/layout/AuthLayout"
import AuthProvider from "./providers/AuthProvider"
import { LOCATION_PATH } from "./constants/locations"

function App() {
    return <AuthProvider>
        <Routes>
            <Route element={<NavLayout />}>
                <Route path={LOCATION_PATH.HOME.PAGE} element={<Home />} />
                <Route path="/category/games" element={<GameCategory />} />
                <Route path={LOCATION_PATH.ACCOUNT.PAGE} element={<ProtectedRoute><Account/></ProtectedRoute>} />
                <Route path={LOCATION_PATH.CART.PAGE} element={<Cart />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path={LOCATION_PATH.AUTH.LOGIN} element={<Login />} />
                <Route path={LOCATION_PATH.AUTH.REGISTER} element={<Register />} />
            </Route>
        </Routes>
    </AuthProvider>
}

export default App
