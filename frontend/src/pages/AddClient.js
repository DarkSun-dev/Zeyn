import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import { Divider, LinearProgress } from "@mui/material"
import { Button } from 'bootstrap-4-react'
import { InputAdornment } from '@mui/material'
import { TextField } from "@mui/material"
import axios from "axios"
import { Modal as BaseModal } from '@mui/base/Modal'
import * as React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system'
import { useState } from "react"
import { useForm } from "react-hooks-helper"

const AddClient = ({ user, isLoggedIn }) => {
    const [log, setLog] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [load, setLoad] = useState(false)

    const [formData, setForm] = useForm({
        clientID: '',
        client: '',
        client_nuit: '',
        email: '',
        client_telefone: ''
    })

    const {
        clientID,
        client,
        client_nuit,
        email,
        client_telefone
    } = formData

    return (
        <div>{load ? <LinearProgress /> : ''} 
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <strong>Cadastrar cliente</strong>
            <Divider />

            <form>
                <TextField
                    label="Código do Cliente"
                    labelId="demo-select-small-label"
                    name="clientID"
                    style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', width: '300px' }}
                    size="small"
                    value={clientID}
                    onChange={setForm}
                    placeholder={'*'}
                    helperText="Denominação"
                />
                <TextField
                    label="Cliente"
                    labelId="demo-select-small-label"
                    name="client"
                    style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', width: '300px' }}
                    size="small"
                    value={client}
                    onChange={setForm}
                    placeholder={'*'}
                    helperText="Denominação"
                />
                <TextField
                    label="NUIT"
                    labelId="demo-select-small-label"
                    name="client_nuit"
                    style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', width: '300px' }}
                    size="small"
                    value={client_nuit}
                    onChange={setForm}
                    placeholder={'*'}
                    helperText="Nuit do Cliente"
                />
                <TextField
                    label="Email"
                    labelId="demo-select-small-label"
                    name="email"
                    style={{ marginTop: '10px', marginBottom: '10px', marginRight: '10px', width: '300px' }}
                    size="small"
                    value={email}
                    onChange={setForm}
                    placeholder={'*'}
                    helperText="Correio electrónico"
                />
                <TextField
                    label="Telefone"
                    labelId="demo-select-small-label"
                    name="client_telefone"
                    type="telefone"
                    value={client_telefone}
                    inputProps={{ maxLength: 9 }}
                    onChange={setForm}
                    placeholder={'*'}
                    size="small"
                    style={{ width: '250px', marginBottom: '10px', marginRight: '10px', marginTop: '10px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(+258)</strong></InputAdornment>
                    }}
                />

                <button type="button" style={{ marginBottom: '10px', marginTop: '10px' }} class="btn btn-primary"
                    onClick={() => {
                        setLog([])
                        setLoad(true)
                        const data = {
                            clientID: formData.clientID,
                            client: formData.client,
                            client_nuit: formData.client_nuit === '' ? '00000': formData.client_nuit,
                            email: formData.email === '' ? 'example@xyz.com' : formData.email,
                            client_telefone: formData.client_telefone
                        }
                        
                        const result = Object.keys(data).filter(el => !data[el])
                        if(result.length == 0){
                            axios.post('/api/createClient', data).then(res => {
                                //console.log(res);
                                if(res.data.status === 'success'){
                                    setLog([{ message: 'Cliente cadastrado com sucesso', role: 'success' }])
                                }else{
                                    setLog([{ message: 'Erro de submetido', role: 'error' }])
                                }
                                if(res.data.code === 11000){
                                    setLog([{ message: 'Esta empresa já se encontra registada no sistema.', role: 'error' }]) 
                                }
                            }).catch(e => {console.log(e); alert('Erro de operação.')})
                        }else{
                            setLog([{ message: 'Campos vazios! Preencha os campos por favor.', role: 'error' }])
                        }
                        setLoad(false)
                        handleOpen()
                    }}
                >CADASTRAR</button>
                <hr></hr>
            </form>


            {log.length == 0 ? <span></span> : <div>
                <Modal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    slots={{ backdrop: StyledBackdrop }}
                >
                    <ModalContent sx={{ width: 400 }}>
                        <div>
                            <h2 id="unstyled-modal-title" className="modal-title" style={{ color: 'silver' }}>
                                Log
                            </h2>
                            {log[0].role === 'error' ? <p id="unstyled-modal-description" className="modal-description">
                                <div style={{ textAlign: 'center' }}>
                                    <img style={{ width: '100px' }} src={require('../assets/image/error.png')} />
                                    <hr></hr>
                                    <span style={{ color: 'red', fontSize: '13px' }}>{log[0].message}</span>
                                </div>
                            </p> :
                                <p id="unstyled-modal-description" className="modal-description">
                                    <div style={{ textAlign: 'center' }}>
                                        <img style={{ width: '100px' }} src={require('../assets/image/done.png')} />
                                        <hr></hr>
                                        <span style={{ color: 'green', fontSize: '13px' }}>{log[0].message}</span>
                                    </div>
                                </p>
                            }
                        </div>
                    </ModalContent>
                </Modal>
            </div>}

        </div>)
}




const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
}


const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
}

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
)


export default AddClient