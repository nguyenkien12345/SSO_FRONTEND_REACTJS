import App from "../App"
import { Outlet } from "react-router-dom"

// Bản thân thằng component App chính là component cha sử dụng Outlet để cho phép lồng
// các component con (nested routes) bên trong.

function AppRoute() {
    return (
        <>
            <App />
            <Outlet />
        </>
    )
}

export default AppRoute