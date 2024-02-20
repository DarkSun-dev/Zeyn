import { Button, LinearProgress } from "@material-ui/core"
import axios from "axios"
import * as React from 'react'
import { Input as BaseInput } from '@mui/base/Input'
import { useForm, useStep } from "react-hooks-helper"
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ModalB from "bootstrap-4-react/lib/components/modal"
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal'

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openModal, setModal] = React.useState(false)
    const [load, setLoad] = React.useState(false)

    const [formData, setForm] = useForm({
        username: "",
        password: "",
        telefone: ""
    })

    const {
        username,
        password,
        telefone
    } = formData

    function log() {
        setModal(true)
        setLoad(true)
        axios.post('/api/user/login', { telefone: formData.username, password: formData.password }).then(res => {
            if (res.data.status === "success") {
                setTimeout(() => {
                    window.location.href = '/'
                    setLoad(false)
                }, 500);
            } else {
                setLoad(false)
                handleOpen()
            }

        }).catch(err => {
            setLoad(false);
            handleOpen()
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            log()
        }
    }

    React.useEffect(() => {
        document.title = 'Login';
    }, [])

    return (
        <div>           {load ? <LinearProgress /> : ''}
            <section class="vh-100" style={{ backgroundColor: '#eee', margin: '10px', marginTop: '-50px' }}>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100" >
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" style={{ borderRadius: '25px' }}>
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center" style={{ marginTop: '-25px', marginBottom: '-10px' }}>
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p class="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"><span style={{ color: 'silver' }}>Entrar no</span> <strong><em><span style={{ color: 'red' }}>O</span><span style={{ color: 'black' }}>rders</span></em></strong></p>
                                            <form class="mx-1 mx-md-4">
                                                <TextField
                                                    label="Telefone"
                                                    name="username"
                                                    type="username"
                                                    value={username}
                                                    inputProps={{ maxLength: 9 }}
                                                    onChange={setForm}
                                                    size="small"
                                                    required={true}
                                                    style={{ width: '250px', marginBottom: '20px' }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(+258)</strong></InputAdornment>
                                                    }}
                                                /> <br></br>

                                                <Input aria-label="Demo input" type="password" onKeyDown={handleKeyDown} name="password" value={password} onChange={setForm} placeholder="Password" />
                                                <br></br>

                                                <div>
                                                    <button type="button" style={{ marginRight: '20px' }} class="btn btn-primary" data-toggle="modal" data-target={openModal.bool ? "#sucC" : ""}
                                                        onClick={log}
                                                    >Entrar</button>

                                                </div> <br></br>
                                                
                                                <hr style={{ marginBottom: '-5px' }}></hr>
                                                <a href="#" data-toggle="modal" data-target="#reset" style={{ fontSize: '13px' }} >* Recuperar password</a> <rb></rb>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >


            <div>

                <Modal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    slots={{ backdrop: StyledBackdrop }}
                >
                    <ModalContent sx={{ width: 400 }}>
                        <h2 id="unstyled-modal-title" className="modal-title" style={{ color: 'silver' }}>
                            Log
                        </h2>
                        <p id="unstyled-modal-description" className="modal-description">
                            <div style={{ textAlign: 'center' }}>
                                <img style={{ width: '100px' }} src={require('../assets/image/error.png')} />
                                <hr></hr>
                                <span style={{ color: 'red', fontSize: '13px' }}>Numero de telefone ou senha errada!</span>
                            </div>
                        </p>
                    </ModalContent>
                </Modal>





                <ModalB id="reset" fade>
                    <ModalB.Dialog centered>
                        <ModalB.Content>
                            <ModalB.Header>
                                <ModalB.Title style={{ color: 'green' }}>Recuperar senha</ModalB.Title>
                                <ModalB.Close>
                                    <span aria-hidden="true">&times;</span>
                                </ModalB.Close>
                            </ModalB.Header>
                            <ModalB.Body>
                                <p>
                                    <span style={{ fontSize: '13px', color: 'coral' }}>Serviço de recuperação de senha encontra-se temporariamente indisponível!</span>
                                    <br></br> {/* <span>Forneça-nos o seu número de telefone</span>*/}
                                    <span>Por favor, ligue para: (+258) 872610106/845137534</span>
                                    <hr></hr>
                                    <TextField
                                        label="Telefone"
                                        name="telefone"
                                        type="telefone"
                                        value={telefone}
                                        inputProps={{ maxLength: 9 }}
                                        onChange={setForm}
                                        disabled={true}
                                        size="small"
                                        required={true}
                                        style={{ width: '250px', marginBottom: '10px', marginRight: '5px' }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(+258)</strong></InputAdornment>
                                        }}
                                    />

                                    <button type="button" class="btn btn-info" disabled={true}
                                        onClick={() => {
                                            if (formData.telefone === '') { alert('Preencha o campo com o seu telefone') } else {
                                                axios.post('/api/user/signup/resetPass', { telefone: formData.telefone }).then(res => {
                                                    console.log(res)
                                                })
                                            }
                                        }}
                                    >Submeter</button>

                                </p>
                            </ModalB.Body>
                            <ModalB.Footer>
                                <button type="button" data-dismiss="modal" class="btn btn-danger">Fechar</button>
                            </ModalB.Footer>
                        </ModalB.Content>
                    </ModalB.Dialog>
                </ModalB>
            </div>
        </div >
    )
}

export default Login

const Input = React.forwardRef(function CustomInput(props, ref) {
    return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
})

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
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

const InputElement = styled('input')(
    ({ theme }) => `
  width: 250px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);





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
);

const TriggerButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
);