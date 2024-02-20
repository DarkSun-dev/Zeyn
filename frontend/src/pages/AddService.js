import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import { Button } from 'bootstrap-4-react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Grid } from '@material-ui/core'
import { InputAdornment, LinearProgress } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useForm } from "react-hooks-helper"
import { useState } from "react"
import { Modal as BaseModal } from '@mui/base/Modal'
import * as React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import axios from "axios"


const AddService = ({ user, isLoggedIn }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [load, setLoad] = React.useState(false);

    const [formData, setForm] = useForm({ service: '' })
    const [value, setValue] = useState('')
    const [log, setLog] = useState([])
    const { service } = formData
    return (
        <div> {load ? <LinearProgress /> : ''}
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <strong>ADD SERVICE</strong> <br></br>
            <TextField
                label="Designação"
                name="service"
                value={service}
                onChange={setForm}
                size="small"
                required={true}
                style={{ marginBottom: '10px', width: '100%', marginRight: '10px', marginTop: '10px' }}
                placeholder="Designação do produto/Serviço"
                helperText={<span style={{ color: 'coral' }}>(Preenchimento obrigatório *)</span>}
            />
            <Grid item xs={12} md={4}>
                <CurrencyTextField
                    size="small"
                    required={true}
                    variant="outlined"
                    value={value}
                    label="Valor unitário"
                    currencySymbol="#"
                    style={{ marginBottom: '0px', width: '215px', marginRight: '10px', marginTop: '10px' }}
                    onChange={(event, value) => setValue(value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(MZN)</strong></InputAdornment>
                    }}
                    helperText={<span style={{ color: 'coral' }}>(Preenchimento obrigatório *)</span>}
                />
            </Grid>
            <hr></hr>
            <Button style={{ marginTop: '0px' }} primary onClick={() => {
                setLoad(true)
                setLog([])
                const data = {
                    service: formData.service,
                    unit_price: value
                }
                const result = Object.keys(data).filter(el => !data[el])
                if (result.length == 0) { 
                    axios.post('/api/createService', data).then(res => {
                        //console.log(res)
                        if(res.data.status === 'success'){
                            setLog([{ message: 'Item submetido com sucesso', role: 'success' }])
                            setTimeout(() => {
                                setLoad(false)
                                window.location.href = '/createService'
                            }, 2000);
                        }else{
                            setLog([{ message: 'Item não submetido', role: 'error' }])
                        }
                    }).catch(e => alert('Erro operação!'))
                } else {
                    setLog([{ message: 'Campos vazios!', role: 'error' }])
                }
                handleOpen()
            }}>
                SUBMETER
            </Button>



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


export default AddService