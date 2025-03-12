import Nav from "./components/Navigation/Nav"
import { Route, Routes } from "react-router"

function App() {
    return <div className="relative bg-background w-screen max-w-full h-auto flex flex-col justify-center items-center">
        <Nav/>
        <Routes>
            <Route path="*" element={
                <div className="w-full max-w-7xl px-4 py-2">
                </div>
            }/>
        </Routes>
    </div>
}

export default App
