import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const MainNavigation = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet />
            <Footer />
        </>
    )
}

export default MainNavigation