import axios from "axios"
import { Button } from 'bootstrap-4-react'
import Ordems from "./Ordems"
import Purchase from "./Purchase"
const Menu = ({ user, isLoggedIn }) => {
    return (<div>
        {user.role === 'admin' ?
            <div>
                <div style={{ borderRadius: '5px', border: '1px solid silver', marginTop: '70px', padding: '3px' }}>
                    <Button secondary style={{ marginRight: '5px' }} onClick={() => window.location.href = '/createService'}>Registar serviços</Button>
                    <Button secondary style={{ marginRight: '5px' }} onClick={() => window.location.href = '/createClient'}>Cadastrar Cliente</Button>
                    <Button secondary outline style={{ marginRight: '5px' }} onClick={() => window.location.href = '/services'}>Escopo</Button>
                    <Button success outline style={{ marginRight: '5px' }} onClick={() => window.location.href = '/reportManager'}>Relatórios</Button>
                    <Button secondary outline onClick={() => window.location.href = '/clients'}>Clientes</Button>
                </div>
                <Ordems user={user} isLoggedIn={isLoggedIn} />
            </div>
            :
            <div>
                <div style={{ borderRadius: '5px', border: '1px solid silver', marginTop: '70px', padding: '3px' }}>
                    <Button secondary style={{ marginRight: '5px' }} onClick={() => window.location.href = '/'}>Ordem de serviço</Button>
                    <Button success outline style={{ marginRight: '5px' }} onClick={() => window.location.href = '/historico'}>Histórico</Button>
                </div>
                <Purchase user={user} isLoggedIn={isLoggedIn} />
            </div>
        }

    </div>)
}
export default Menu
