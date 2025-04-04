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
import AccountSettings from "./pages/account/Settings"
import AccountLayout from "./components/layout/AccountLayout"
import AccountSecurity from "./pages/account/security/Security"
import AccountDevices from "./pages/account/security/Devices"
import AccountActivities from "./pages/account/security/Activities"
import AccountActivity from "./pages/account/security/Activity"
import AccountDevice from "./pages/account/security/Device"
import AccountPasskeys from "./pages/account/security/Passkeys"
import AccountChangePassword from "./pages/account/security/ChangePassword"

function App() {
    return <AuthProvider>
        <Routes>
            <Route element={<NavLayout />}>
                <Route path={LOCATION_PATH.HOME.PAGE} element={<Home />} />
                <Route path="/category/games" element={<GameCategory />} />
                <Route path={LOCATION_PATH.CART.PAGE} element={<Cart />} />
            </Route>
            <Route element={<NavLayout fullWidth={true} />}>
                <Route element={<ProtectedRoute><AccountLayout /></ProtectedRoute>} >
                    <Route path={LOCATION_PATH.ACCOUNT.PAGE} element={<Account/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SETTINGS} element={<AccountSettings/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SECURITY.PAGE} element={<AccountSecurity/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SECURITY.DEVICES} element={<AccountDevices/>} />
                    <Route path={`${LOCATION_PATH.ACCOUNT.SECURITY.DEVICES}/:id`} element={<AccountDevice/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES} element={<AccountActivities/>} />
                    <Route path={`${LOCATION_PATH.ACCOUNT.SECURITY.ACTIVITIES}/:id`} element={<AccountActivity/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SECURITY.PASSKEYS} element={<AccountPasskeys/>} />
                    <Route path={LOCATION_PATH.ACCOUNT.SECURITY.CHNG_PSWD} element={<AccountChangePassword/>} />
                </Route>
            </Route>
            <Route element={<AuthLayout />}>
                <Route path={LOCATION_PATH.AUTH.LOGIN} element={<Login />} />
                <Route path={LOCATION_PATH.AUTH.REGISTER} element={<Register />} />
            </Route>
        </Routes>
    </AuthProvider>
}

export default App
