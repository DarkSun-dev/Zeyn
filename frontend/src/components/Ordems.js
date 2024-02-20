import axios from "axios"
import { Button } from 'bootstrap-4-react'
import { useEffect, useState } from "react"
import MyDocument from "../components/MyDocument"
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'
import TextField from '@mui/material/TextField'
import { useForm } from "react-hooks-helper"
import { CircularProgress, Divider } from "@mui/material"
import { Buffer } from 'buffer'

const Ordems = ({ user, isLoggedIn }) => {
    const [log, setLog] = useState({ client: '' })
    const [load, setLoad] = useState(true)
    const [id, setID] = useState('')
    const [rows, setRows] = useState([])
    const [formData, setForm] = useForm({
        justification: ''
    })
    const { justification } = formData

    useEffect(() => {
        axios.get('/api/getOrdems').then(res => {
            console.log(res);
            if (res.data.status === 'success') {
                setRows(res.data.data.data)
            }
            setLoad(false)
        })
    }, [])

    return (<div>
        <h1 style={{ marginTop: '20px' }}>Ordens de serviço</h1>
        <button type="button" class="btn btn-info"
            onClick={() => {
                axios.get('/api/facture').then(res => {
                    console.log(res);
                    const fileBuffer = Buffer.from(res.data.doc, 'base64')
                    const blob = new Blob([fileBuffer], {
                        type: 'application/pdf'
                    })
                    const fileURL = URL.createObjectURL(blob)
                    window.open(fileURL)
                })
            }}
        >facture</button>

        {load ? <div>
            <p style={{ textAlign: 'center' }}>
                <Divider />
                <CircularProgress size={20} style={{ marginTop: '20px' }} />
                <br></br> <span style={{ fontSize: '13px', color: 'green' }}>A carregar odrens</span>
            </p>
        </div>
            :
            <div style={{ marginBottom: '100px' }}>
                {rows.map(el => (<div className="card" style={{ marginBottom: '15px' }}>
                    <div className="card-body">
                        <span className="card-title" style={{ fontSize: '18px' }}>{el.ordem_status === 'pending' ? <span> Status: <strong style={{ color: 'green' }}>pendente</strong></span> : ''}</span>

                        <button type="button" class="btn-warning" style={{ float: 'right' }}
                            onClick={() => {
                                if (el.class === 'b') {
                                    axios.post('/api/getReport', el).then(res => {
                                        console.log(res);
                                        const fileBuffer = Buffer.from(res.data.doc, 'base64')
                                        const blob = new Blob([fileBuffer], {
                                            type: 'application/pdf'
                                        })
                                        const fileURL = URL.createObjectURL(blob)
                                        window.open(fileURL)
                                    })
                                } else {
                                    alert('Cliente de class A. Try to connect a thermal printer')
                                }
                            }}
                        >Emitir ordem (PO)</button>

                        <br></br>
                        <p className="card-text" style={{ marginTop: '10px' }}>
                            <div>
                                <div style={{ fontSize: '13px', border: '1px solid silver', padding: '5px', borderRadius: '5px' }}>
                                    <span>Código: {el.orderID}</span> <br></br>
                                    <span>Cliente: {el.client}</span> <br></br>
                                    <span>Telefone: {el.client_telefone}</span> <br></br>
                                    <span>Data: {el.date}</span>

                                    <span style={{ float: 'right', fontWeight: 'bold' }}>Viatura: {el.vehicleID}</span>
                                </div>

                                <div style={{ fontSize: '13px', marginTop: '10px' }}>
                                    {el.designation.map(elem => (<span> <strong>#</strong> {elem.service} – <span style={{ color: 'green' }}>{elem.unit_price} Mt</span> <br></br></span>))}
                                </div>

                                <div style={{ fontSize: '20px', marginTop: '10px' }}>
                                    <span>Total:</span> <span>{sum(el.designation)}</span>
                                </div>

                                <hr></hr>

                                <button type="button" class="btn btn-danger" data-toggle="modal" href='#modal-id'
                                    onClick={() => {
                                        setLog(el)
                                    }}
                                >Cancelar</button>

                                <button type="button" class="btn btn-outline-secondary" style={{ float: 'right' }}
                                    data-toggle="modal" data-target="#modelId"
                                    onClick={() => {
                                        setID(el._id)
                                    }}
                                >Terminar</button>

                                <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                    <div class="modal-dialog modal-sm" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" style={{ color: 'silver' }}>Log</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <strong style={{ textAlign: 'center' }}>Caro operador, verifique se esta ordem de serviço foi concluída antes de prosseguir em terminar.</strong>
                                            </div>
                                            <div class="modal-footer">

                                                <button type="button" class="btn btn-warning"
                                                    onClick={() => {
                                                        axios.patch(`/api/endOrdem/${id}`, { ordem_status: 'done' }).then(res => {
                                                            if (el.class === 'b') {
                                                                axios.post('/api/getReport', el).then(res => {
                                                                    console.log(res);
                                                                    const fileBuffer = Buffer.from(res.data.doc, 'base64')
                                                                    const blob = new Blob([fileBuffer], {
                                                                        type: 'application/pdf'
                                                                    })
                                                                    const fileURL = URL.createObjectURL(blob)
                                                                    window.open(fileURL)
                                                                    window.location.href = '/'
                                                                }).catch(e => { alert('Erro de operação.') })

                                                            } else {


                                                                //terminar ordem aqui
                                                                alert('Cliente de class A. Try to connect a thermal printer')
                                                            }

                                                        }).catch(e => alert('Erro de operação.'))
                                                    }}
                                                >Terminar & emitir ordem</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>))}

                <div class="modal fade" id="modal-id">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Justificativa</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <TextField
                                    id="outlined-multiline-static"
                                    spellCheck={true}
                                    label="Justificação"
                                    name="justification"
                                    onChange={setForm}
                                    value={justification}
                                    multiline
                                    inputProps={{ maxLength: 280 }}
                                    rows={3}
                                    style={{ marginBottom: '30px', width: '100%', marginRight: '10px' }}
                                    placeholder="Campo obrigatorio"
                                    required={true}
                                    helperText={<span style={{ fontSize: '13px' }}><em><strong>Por favor, justifique o cancelamento desta ordem</strong></em></span>}
                                />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger"
                                    onClick={() => {
                                        const data = {
                                            ordem_status: 'canceled',
                                            justification: formData.justification
                                        }
                                        const result = Object.keys(data).filter(el => !data[el])
                                        if (result.length == 0) {
                                            axios.patch(`/api/endOrdem/${log._id}`, data).then(res => {
                                                window.location.href = '/'
                                            })
                                        } else {
                                            alert('Por favor, justifique antes de prosseguir em terminar.')
                                        }
                                    }}
                                >Cancelar ordem</button>
                            </div>
                        </div>
                    </div>
                </div>
                {rows.length == 0 ? <div> <Divider />
                    <span style={{ color: 'red' }}><em>Sem ordens</em></span>
                </div> : <span></span>}
            </div>}
    </div>)
}

const sum = (arr) => {
    var x = 0
    for (let index = 0; index < arr.length; index++) {
        x = x + parseInt(arr[index].unit_price)
    }
    return x
}

/*
      <BlobProvider document={<MyDocument />}>
                            {({ url }) => (
                                <a href={url} target="_blank">
                                    <button type="button" class="btn-warning" style={{ float: 'right' }}>Imprimir Extrato</button>
                                </a>
                            )}
                        </BlobProvider>*/

export default Ordems
