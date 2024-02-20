import axios from "axios"
const Header = ({ user, isLoggedIn }) => {
    return (
        <div>
            <a style={{textDecoration: 'none', color: 'none'}} href="/">
            <div>
                <h1><strong><em><span style={{ color: 'red' }}>O</span><span style={{ color: 'black' }}>rders</span></em></strong></h1>
                {isLoggedIn ?<p style={{color: 'silver', marginTop: '-20px', marginLeft: '70px'}}><strong>{user.role}</strong></p>: 
                <p style={{color: 'silver', marginTop: '-20px', marginLeft: '70px'}}><strong>System</strong></p>
                }
            </div> 
            </a>
            <p style={{backgroundColor: 'silver', height: '2px', borderBottom: '1px solid rgb(200, 200, 200)', marginTop: '-10px'}}></p>
            {isLoggedIn ?
                <button type="button" class="btn btn-danger" style={{float: 'right'}}
                    onClick={() => {
                        axios.get('/api/user/logout').then(res => {
                            window.location.href = '/'
                        })
                    }}
                >Logout</button> :
                <button type="button" class="btn btn-primary" style={{float: 'right'}}
                onClick={() => { window.location.href = '/login' }}>Login</button>
            }
        </div>)
}
export default Header
