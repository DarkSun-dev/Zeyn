import axios from "axios"
import { useEffect } from "react"
import Header from "../components/Header"
import Menu from "../components/Menu"
import About from "../components/About"
const Home = ({ user, isLoggedIn }) => {
    useEffect(() => {
        console.log(user)
        console.log('Is it logged: ' + isLoggedIn)
        document.title = 'Principal'
    }, [])

    return (
        <div>
            <Header user={user} isLoggedIn={isLoggedIn} />
            {isLoggedIn ? <Menu user={user} isLoggedIn={isLoggedIn} /> : <About />}
        </div>)
}
export default Home
