import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import { useEffect, useState } from "react"
import { Button } from 'bootstrap-4-react'
import axios from "axios"
const Historico = ({ user, isLoggedIn }) => {
    const [rows, setRows] = useState([]) 
    useEffect(() => {
        axios.get('/api/getOrdems').then(res => {
            console.log(res);
            if (res.data.status === 'success') {
                setRows(res.data.data.data)
            }
        })
    }, [])

    return (
        <div>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <h1 style={{marginTop: '20px'}}>Minhas ordens</h1>
            {rows.map(el => (<div className="card" style={{ marginBottom: '15px' }}>
                <div className="card-body">
                    <span className="card-title" style={{ fontSize: '18px' }}>{el.ordem_status === 'pending' ? <span> Status: <strong style={{ color: 'green' }}>pendente</strong></span> : ''}</span>
                    <br></br>
                    <p className="card-text" style={{ marginTop: '10px' }}>
                        <div>
                            <div style={{ fontSize: '13px', border: '1px solid silver', padding: '5px', borderRadius: '5px' }}>
                            <span>ID: {el.orderID}</span> <br></br>
                                <span>Cliente: {el.client}</span> <br></br>
                                <span>Telefone: {el.client_telefone}</span> <br></br>
                                <span>Data: {el.date}</span>
                            </div>

                            <div style={{ fontSize: '13px', marginTop: '10px' }}>
                                {el.designation.map(elem => (<span> <strong>#</strong> {elem.service} – <span style={{ color: 'green' }}>{elem.unit_price} Mt</span> <br></br></span>))}
                            </div>

                            <div style={{ fontSize: '20px', marginTop: '10px' }}>
                                <span>Total:</span> <span>{sum(el.designation)}</span>
                            </div>
                        </div>
                    </p>
                </div>
            </div>))}
        </div>)
}

const sum = (arr) => {
    var x = 0
    for (let index = 0; index < arr.length; index++) {
        x = x + parseInt(arr[index].unit_price)
    }
    return x
}

export default Historico