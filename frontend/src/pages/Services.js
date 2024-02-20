import { CircularProgress, Divider, LinearProgress } from "@mui/material"
import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import axios from "axios"
import { Button } from 'bootstrap-4-react'
import { useEffect, useState } from "react"
const Services = ({ user, isLoggedIn }) => {
    const [rows, setRows] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('/api/getService').then(res => {
            console.log(res)
            if (res.data.status === 'success') {
                setRows(res.data.data.data)
            }
            setLoad(false)
        })
    }, [])

    return (
        <div>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <div class="card">
                {load ? <LinearProgress /> : ''}
                <div class="card-body">
                    <h4 class="card-title">Serviços
                    </h4>
                </div>
                <ul class="list-group list-group-flush">
                    {rows.map(el => (<li class="list-group-item" key={el._id} style={{ fontSize: '14px' }}>
                        <span> <strong>#</strong> {el.service}</span> – <span style={{ color: 'green' }}>{el.unit_price} (Mzn)</span>
                        <span style={{ marginLeft: '20px' }}>
                            <button type="button" class="btn-danger"
                                onClick={() => {
                                    axios.delete(`/api/removeService/${el._id}`).then(e => {
                                        alert('Item removido!')
                                        window.location.href = '/services'
                                    }).catch(e => alert('Erro de operação.'))
                                }}
                            >remover item</button>
                            <Divider />
                        </span>
                        
                    </li>))}
                </ul>
            </div>

        </div>)
}
export default Services