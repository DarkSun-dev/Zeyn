import axios from "axios"
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField'
import { useForm } from "react-hooks-helper"
import { CircularProgress, Divider } from "@mui/material"
import MyDocument from "../components/MyDocument"
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'
import { Buffer } from 'buffer'

const ClientTabs = ({ client, role }) => {
    const [log, setLog] = useState({ client: '' })
    const [load, setLoad] = useState(true)
    const [id, setID] = useState('')
    const [formData, setForm] = useForm({
        justification: ''
    })
    const { justification } = formData

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])


    return (<div>
        {load ? <div>
            <p style={{ textAlign: 'center' }}>
                <CircularProgress size={20} style={{ marginTop: '20px' }} />
                <br></br> <span style={{ fontSize: '13px', color: 'green' }}>A carregar odrens</span>
            </p>
        </div>
            :
            <div style={{ marginBottom: '100px' }}>
                {client.map(el => (el.ordem_status === role ? <div className="card" style={{ marginBottom: '15px' }}>
                    <div className="card-body">
                        <span className="card-title" style={{ fontSize: '18px' }}><span> Status: <strong style={{ color: el.ordem_status === 'pending' ? 'goldenrod' : el.ordem_status === 'done' ? 'green' : 'red' }}>{el.ordem_status}</strong></span></span>

                        {role === 'canceled' ? <BlobProvider document={<MyDocument data={el} />}>
                            {({ url }) => (
                                <a href={url} target="_blank">
                                    <button type="button" class="btn-warning" style={{ float: 'right' }}>Imprimir justificativa</button>
                                </a>
                            )}
                        </BlobProvider>
                            : <button type="button" class="btn-warning" style={{ float: 'right' }}
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
                            >Imprimir Extrato</button>}

                        <br></br>
                        <p className="card-text" style={{ marginTop: '10px' }}>
                            <div>
                                <div style={{ fontSize: '13px', border: '1px solid silver', padding: '5px', borderRadius: '5px' }}>
                                    <span>Telefone: {el.client_telefone}</span> <br></br>
                                    <span>Data: {el.date}</span>
                                </div>

                                <div style={{ fontSize: '13px', marginTop: '10px' }}>
                                    {el.designation.map(elem => (<span> <strong>#</strong> {elem.service} – <span style={{ color: 'green' }}>{elem.unit_price} Mt</span> <br></br></span>))}
                                </div>

                                <div style={{ fontSize: '20px', marginTop: '10px' }}>
                                    <span>Total:</span> <span>{sum(el.designation)}</span>
                                </div>



                                {role === 'canceled' || role === 'done' ? <span></span> : <div>   <hr></hr> <button type="button" class="btn btn-danger" data-toggle="modal" href='#modal-id'
                                    onClick={() => {
                                        setLog(el)
                                    }}
                                >Cancelar ordem</button>

                                    <button type="button" class="btn btn-success" style={{ float: 'right' }}
                                        data-toggle="modal" data-target="#modelId"
                                        onClick={() => {
                                            setID(el._id)
                                        }}
                                    >Terminar</button> </div>}


                                <div class="modal fade" id="modelId" style={{ marginTop: '50px' }} tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                <button type="button" class="btn btn-primary"
                                                    onClick={() => {
                                                        axios.patch(`/api/endOrdem/${id}`, { ordem_status: 'done' }).then(res => {
                                                            window.location.href = '/clients'
                                                        })
                                                    }}
                                                >Terminar ordem</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </p>
                    </div>
                </div> : <span></span>))}

                <div class="modal fade" id="modal-id" style={{ marginTop: '50px' }}>
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
                                                window.location.href = '/clients'
                                            })
                                        } else {
                                            alert('Por favor, justifique antes de prosseguir em terminar.')
                                        }
                                    }}
                                >CANCELAR & TERMINAR</button>
                            </div>
                        </div>
                    </div>
                </div>
                {client.length == 0 ? <div> <Divider />
                    <span style={{ color: 'silver', marginTop: '10px' }}><em>Sem registos</em></span>
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

export default ClientTabs
