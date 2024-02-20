import axios from "axios"
import { useAutocomplete } from '@mui/base/useAutocomplete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { CircularProgress, Divider, InputLabel, LinearProgress, TextField } from "@mui/material"
import { InputAdornment } from '@mui/material'
import { useForm } from "react-hooks-helper"
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Grid } from '@material-ui/core'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import GppBadIcon from '@mui/icons-material/GppBad'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Purchase = ({ user, isLoggedIn }) => {
    const [log, setLog] = useState([])
    const [logb, setLogb] = useState([])
    const [price, setPrice] = useState('')
    const [load, setLoad] = useState(false)
    const [spin, setSpin] = useState(true)
    const [isClient, setClient] = useState({ status: '' })
    const [process, setProcess] = useState(true)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setForm] = useForm({
        client: "",
        client_telefone: "",
        vehicleID: "",
        service: "",
        clientID: ""
    })
    const { client, client_telefone, vehicleID, service, clientID } = formData
    const [items, setItems] = useState([{ service: '', unit_price: '' }])
    useEffect(() => {
        axios.get('/api/getService').then(res => {
            console.log(res)
            if (res.data.status === 'success') {
                setItems(res.data.data.data)
            }
        })
    }, [])

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: [items[0]],
        multiple: true,
        options: items,
        isOptionEqualToValue: (option, value) => option.service === value.service,
        getOptionLabel: (option) => option.service,
    })



    return (<div>
        <div class="card" style={{ marginTop: '13px', marginBottom: '100px' }}>
            <div class="card-body">
                <h4 class="card-title">Ordem</h4>
                <button type="button" class="btn btn-success" data-toggle="modal" href='#modal-idB'
                    style={{ float: 'right', marginTop: '-40px' }}
                >ADD [+]</button>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <Root style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <div {...getRootProps()}>
                            <Label {...getInputLabelProps()}><strong style={{ color: 'green' }}>Designação do produto/Ordem de serviço</strong> <br></br>
                            </Label>
                            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                                {value.map((option, index) => (
                                    <StyledTag label={option.service} {...getTagProps({ index })} />
                                ))}
                                <input placeholder={'*Seleccionar'} {...getInputProps()} />
                            </InputWrapper>
                        </div>
                        {groupedOptions.length > 0 ? (
                            <Listbox {...getListboxProps()}>
                                {groupedOptions.map((option, index) => (
                                    <li {...getOptionProps({ option, index })}>
                                        <span>{option.service} – {option.unit_price} <span style={{ color: 'green', fontSize: '12px' }}>Mt</span></span>
                                        <CheckIcon fontSize="small" />
                                    </li>
                                ))}
                            </Listbox>
                        ) : null}
                    </Root>
                    <InputLabel style={{ position: 'relative', top: '5px', left: '50px' }} id="demo-select-small-label">Telefone do Cliente</InputLabel>
                    <TextField
                        label="."
                        labelId="demo-select-small-label"
                        name="client_telefone"
                        type="telefone"
                        value={client_telefone}
                        inputProps={{ maxLength: 9 }}
                        onChange={setForm}
                        placeholder={'*Campo obrigatório'}
                        size="small"
                        style={{ width: '250px', marginBottom: '10px', marginTop: '0px' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(+258)</strong></InputAdornment>
                        }}
                    />
                    <br></br>
                    <InputLabel style={{ position: 'relative', top: '5px', left: '50px', color: 'red' }} id="demo-select-small-label">Matrícula do veículo</InputLabel>
                    <TextField
                        label="."
                        labelId="demo-select-small-label"
                        name="vehicleID"
                        style={{ marginTop: '0px', marginRight: '10px', width: '300px' }}
                        size="small"
                        value={vehicleID}
                        onChange={setForm}
                        placeholder={'*Campo obrigatório'}
                        helperText="Viatura"
                    />
                    <hr></hr>

                    <InputLabel style={{ position: 'relative', top: '5px', left: '0px' }} id="demo-select-small-label">Código único de identificação (ID)
                        {formData.clientID === '' ? <span></span> : <span>{isClient.status === '' ? <span></span> : isClient.status === 'success' ? <CheckCircleIcon style={{ fontSize: '18px', color: 'green' }} /> : <GppBadIcon style={{ fontSize: '18px', color: 'red' }} />}</span>}
                    </InputLabel>
                    <TextField
                        label="."
                        labelId="demo-select-small-label"
                        name="clientID"
                        style={{ marginTop: '0px', marginRight: '10px', width: '300px' }}
                        size="small"
                        value={clientID}
                        onChange={setForm}
                        placeholder={'*'}
                        helperText={<span style={{ color: formData.clientID === '' ? 'black' : 'green' }}><strong>Campo reservado</strong></span>}
                    />
                    {formData.clientID === '' ? <span></span> : <button type="button" style={{ marginLeft: '15px' }} class="btn btn-success"
                        onClick={() => {
                            setSpin(true)
                            handleOpen()
                            console.log(formData.clientID)
                            axios.get(`/api/verifyClient/${formData.clientID}`).then(res => {
                                //setClient()
                                console.log(res)
                                if (res.data.status === 'success') {
                                    //res.data.data.data
                                    setClient({ status: 'success', doc: res.data.data.data[0] })
                                } else {
                                    setClient({ status: 'error', doc: [] })
                                }

                                setTimeout(() => {
                                    setSpin(false)
                                }, 1000)
                            })
                        }}
                    >Verificar ID</button>}


                    <InputLabel style={{ position: 'relative', top: '8px', left: '0px' }} id="demo-select-small-label">Cliente</InputLabel>
                    <TextField
                        label="."
                        labelId="demo-select-small-label"
                        name="client"
                        disabled={formData.clientID === '' ? false : true}
                        style={{ marginTop: '5px', marginBottom: '10px', marginRight: '10px', width: '300px' }}
                        size="small"
                        value={client}
                        onChange={setForm}
                        placeholder={'*Campo obrigatório'}
                        helperText="Nome do Cliente"
                    />


                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            {spin ? <div style={{ textAlign: 'center' }}>
                                <CircularProgress size={28} /> <br></br>
                                <span style={{ color: 'coral' }}>A verificar ID do Cliente...</span>
                            </div> :
                                <div style={{ textAlign: 'center' }}>
                                    {isClient.status === 'success' ?
                                        < div >
                                            <span style={{ color: 'green' }}><CheckCircleIcon style={{ fontSize: '50px' }} /></span>
                                            <span style={{ color: 'green' }}>Código verificado com sucesso </span>
                                            <hr></hr>
                                            <div style={{ fontSize: '13px', border: '1px solid silver', padding: '5px', borderRadius: '5px' }}>
                                                <span><strong>{isClient.doc.client.toUpperCase()}</strong></span>
                                                <Divider />
                                                <span>Código: {isClient.doc.clientID}</span> <br></br>
                                                <span>Telefone: {isClient.doc.client_telefone}</span> <br></br>
                                                <span>Nuit: {isClient.doc.client_nuit}</span>
                                            </div>
                                        </div> : <span></span>}

                                    {isClient.status === 'error' ? <div>
                                        <span style={{ color: 'red' }}><GppBadIcon style={{ fontSize: '50px' }} /></span>
                                        <hr></hr>
                                        <span style={{ color: 'red' }}>Código inválido</span>
                                    </div> : <span></span>}
                                </div>}
                        </Box>
                    </Modal>


                    <hr></hr>
                    <button type="button" class="btn btn-primary" data-toggle="modal" href='#modal-id'
                        onClick={() => {
                            setProcess(true)
                            var row = []
                            for (let index = 0; index < value.length; index++) {
                                if (index > 0) {
                                    row.push(value[index])
                                }
                            }

                            if (formData.clientID === '') {
                                const data = {
                                    orderID: formData.client_telefone + "" + new Date().getFullYear(),
                                    client: formData.client,
                                    client_telefone: formData.client_telefone,
                                    vehicleID: formData.vehicleID,
                                    class: 'a',
                                    designation: row,
                                    date: new Date().toLocaleString('pt-PT')
                                }
                                const result = Object.keys(data).filter(el => !data[el])
                                if (result.length == 0) {
                                    console.log(data)
                                    setLog([{ role: 'success', doc: data }])
                                } else {
                                    setLog([{ role: 'error', message: "Erro no formulário de ordem. \n Por favor, preencher campo(s)::: " + result }])
                                    //alert("Erro no formulário de ordem. \n Por favor, preencher campo(s): " + result)
                                }
                                setProcess(false)
                            } else {
                                axios.get(`/api/verifyClient/${formData.clientID}`).then(res => {
                                    if (res.data.status === 'success') {
                                        const data = {
                                            orderID: formData.clientID,
                                            client: res.data.data.data[0].client,
                                            client_telefone: formData.client_telefone,
                                            vehicleID: formData.vehicleID,
                                            class: 'b',
                                            designation: row,
                                            date: new Date().toLocaleString('pt-PT')
                                        }
                                        const result = Object.keys(data).filter(el => !data[el])
                                        if (result.length == 0) {
                                            setLog([{ role: 'success', doc: data }])
                                        } else {
                                            setLog([{ role: 'error', message: "Erro no formulário de ordem. \n Por favor, preencher campo(s)::: " + result }])
                                        }
                                    } else {
                                        setLog([{ role: 'error', message: "Código único de identificação (ID) é inválido." }])
                                    }
                                    setProcess(false)
                                }).catch(e => { alert('Error.'); setProcess(false) })
                            }

                        }}
                    >SUBMETER</button>
                </li>
            </ul>
        </div>

        {
            log.length == 0 ? <span></span> : <div class="modal fade" id="modal-id">
                <div class="modal-dialog">
                    {process ? <div style={{ margin: '20px', textAlign: 'center' }}><CircularProgress size={30} /><br></br><span style={{ color: '#fff' }}>A processar...</span></div> : <div class="modal-content">
                        {load ? <LinearProgress /> : ''}
                        <div class="modal-header">
                            {log[0].role === 'error' ? <h4 class="modal-title" style={{ color: 'silver' }}>Log</h4> :
                                <h4 class="modal-title">Cotação</h4>}
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                        </div>
                        <div class="modal-body">
                            <div>
                                {log[0].role === 'error' ? <p id="unstyled-modal-description" className="modal-description">
                                    <div style={{ textAlign: 'center' }}>
                                        <img style={{ width: '100px' }} src={require('../assets/image/error.png')} />
                                        <hr></hr>
                                        <span style={{ color: 'red', fontSize: '13px' }}>{log[0].message}</span>
                                    </div>
                                </p> :
                                    <p id="unstyled-modal-description" className="modal-description">
                                        <div>
                                            <div style={{ fontSize: '13px', border: '1px solid silver', padding: '5px', borderRadius: '5px' }}>
                                                <span>Cliente: {log[0].doc.client}</span> <br></br>
                                                <span>Telefone: {log[0].doc.client_telefone}</span> <br></br>
                                                <span>Data: {new Date().toLocaleDateString()}</span>
                                            </div>

                                            <div style={{ fontSize: '13px', marginTop: '10px' }}>
                                                {log[0].doc.designation.map(el => (<span> <strong>#</strong> {el.service} – <span style={{ color: 'green' }}>{el.unit_price} Mt</span> <br></br></span>))}
                                            </div>

                                            <div style={{ fontSize: '20px', marginTop: '10px' }}>
                                                <span>Total:</span> <span>{sum(log[0].doc.designation)}</span>
                                            </div>
                                        </div>
                                    </p>
                                }
                            </div>
                        </div>
                        <div class="modal-footer">
                            {log[0].role === 'error' ? <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> :
                                <button type="button" class="btn btn-success"
                                    onClick={() => {
                                        setLoad(true)
                                        console.log(log[0].doc)

                                        axios.post('/api/ordeService', log[0].doc).then(res => {
                                            if (res.data.status === 'success') {
                                                setTimeout(() => {
                                                    window.location.href = '/'
                                                }, 2000)
                                            } else {
                                                setLoad(false)
                                                alert('Erro na operação')
                                            }
                                        }).catch(e => { alert('Erro na operação'); setLoad(false) })

                                    }}
                                >SUBMETER ORDEM</button>
                            }
                        </div>
                    </div>}
                </div>
            </div>
        }



        <div class="modal fade" id="modal-idB">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" style={{ color: 'silver' }}>Adicionar serviço/produto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
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
                                value={price}
                                label="Valor unitário"
                                currencySymbol="#"
                                style={{ marginBottom: '0px', width: '215px', marginRight: '10px', marginTop: '10px' }}
                                onChange={(event, value) => setPrice(value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" style={{ marginTop: '0px' }}><strong style={{ color: 'green' }}>(MZN)</strong></InputAdornment>
                                }}
                                helperText={<span style={{ color: 'coral' }}>(Preenchimento obrigatório *)</span>}
                            />
                        </Grid>
                    </div>
                    <div class="modal-footer">
                        {logb.length == 0 ? '' :
                            logb[0].role === 'error' ? <p style={{ backgroundColor: 'red', padding: '3px', fontSize: '13px', color: 'white', borderRadius: '5px' }}>{logb[0].message}</p>
                                : <p style={{ backgroundColor: 'green', padding: '3px', fontSize: '13px', color: 'white', borderRadius: '5px' }}>{logb[0].message}</p>}

                        <button type="button" class="btn btn-primary"
                            onClick={() => {
                                const data = {
                                    service: formData.service,
                                    unit_price: price
                                }
                                const result = Object.keys(data).filter(el => !data[el])
                                if (result.length == 0) {
                                    items.push(data)
                                    setLogb([{ message: 'Item adicionado', role: 'success' }])
                                    setTimeout(() => {
                                        setLogb([])
                                    }, 2000)
                                } else {
                                    setLogb([{ message: 'Campos vazios!', role: 'error' }])
                                }
                            }}
                        >Adicionar & salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div >)
}

const sum = (arr) => {
    var x = 0
    for (let index = 0; index < arr.length; index++) {
        x = x + parseInt(arr[index].unit_price)
    }
    return x
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    borderRadius: '5px',
    boxShadow: 5,
    p: 4,
}
/*

orderID: {
        type: String, //order-user Telefone
        required: true
    },
    client_telefone: {
        type: String,
        required: true
    },
    vehicleID: {
        type: String,
        required: true
    },
    designation: Array,
    date: String,*/

const Root = styled('div')(
    ({ theme }) => `
            color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
            font-size: 14px;
          `,
);

const Label = styled('label')`
            padding: 0 0 4px;
            line-height: 1.5;
            display: block;
          `;

const InputWrapper = styled('div')(
    ({ theme }) => `
            width: 300px;
            border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
            background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
            border-radius: 4px;
            padding: 1px;
            display: flex;
            flex-wrap: wrap;
          
            &:hover {
              border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
            }
          
            &.focused {
              border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
              box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
            }
          
            & input {
              background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
              color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
              height: 30px;
              box-sizing: border-box;
              padding: 4px 6px;
              width: 0;
              min-width: 30px;
              flex-grow: 1;
              border: 0;
              margin: 0;
              outline: 0;
            }
          `,
);

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
    ({ theme }) => `
            display: flex;
            align-items: center;
            height: 24px;
            margin: 2px;
            line-height: 22px;
            background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
        };
            border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
            border-radius: 2px;
            box-sizing: content-box;
            padding: 0 4px 0 10px;
            outline: 0;
            overflow: hidden;
          
            &:focus {
              border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
              background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
            }
          
            & span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          
            & svg {
              font-size: 12px;
              cursor: pointer;
              padding: 4px;
            }
          `,
);

const Listbox = styled('ul')(
    ({ theme }) => `
            width: 300px;
            margin: 2px 0 0;
            padding: 0;
            position: absolute;
            list-style: none;
            background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
            overflow: auto;
            max-height: 250px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            z-index: 1;
          
            & li {
              padding: 5px 12px;
              display: flex;
          
              & span {
                flex-grow: 1;
              }
          
              & svg {
                color: transparent;
              }
            }
          
            & li[aria-selected='true'] {
              background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
              font-weight: 600;
          
              & svg {
                color: #1890ff;
              }
            }
          
            & li.${autocompleteClasses.focused} {
              background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
              cursor: pointer;
          
              & svg {
                color: currentColor;
              }
            }
          `,
);

export default Purchase