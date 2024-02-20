import * as React from 'react';
import { CircularProgress, DialogContent, Divider, LinearProgress } from "@mui/material"
import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import axios from "axios"
import { Button } from 'bootstrap-4-react'
import { useEffect, useState } from "react"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide';
import ClientTabs from '../components/ClientTabs';
import { Buffer } from 'buffer'

import ReceiptIcon from '@mui/icons-material/Receipt';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Client = ({ user, isLoggedIn }) => {
    const [load, setLoad] = useState(true)
    const [rows, setRows] = useState([])
    const [client, setClient] = useState({ client: '' })
    const [progress, setProgress] = useState(false)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }
const [printing, setPrinting] = useState(false)

    const [process, setProcess] = useState(true)
    const [ordes, setOrdes] = useState([])
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => { setValue(newValue); }


    useEffect(() => {
        axios.get('/api/getClients').then(res => {
            if (res.data.status === 'success') {
                setRows(res.data.data.data)
            }
            setLoad(false)
        })
    }, [])

    return (
        <div> {progress ? <LinearProgress /> : <span></span>}
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <strong style={{ color: 'green' }}>Clientes registados</strong>
            {load ? <div>
                <p style={{ textAlign: 'center' }}> <Divider style={{ marginTop: '10px' }} />
                    <CircularProgress size={20} style={{ marginTop: '20px' }} />
                    <br></br> <span style={{ fontSize: '13px', color: 'green' }}>A carregar lista</span>
                </p>
            </div> : <div style={{ overflowX: 'auto' }}> <table class="table table-hover" style={{ marginTop: '20px', fontSize: '13px' }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código único de identificação (ID)</th>
                        <th scope="col">Cliente</th>
                        <th scope="col" style={{ color: 'silver' }}>Nuit</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((el, i) => (<tr>
                        <th scope="row">{i + 1}</th>
                        <td><strong style={{ color: 'green' }}>{el.clientID} <AccountBalanceWalletIcon /></strong></td>
                        <td>{el.client}</td>
                        <td style={{ color: 'silver' }}>{el.client_nuit}</td>
                        <td>{el.email}</td>
                        <td>{el.client_telefone}</td>
                        <td>
                            <button type="button" class="btn btn-primary" onClick={() => {
                                setProgress(true)
                                setClient(el)

                                setTimeout(() => {
                                    handleClickOpen()
                                    setProgress(false)
                                }, 100)

                                axios.get(`/api/getOrdes/${el.clientID}`).then(res => {
                                    if (res.data.status === 'success') {
                                        setOrdes(res.data.data.data)
                                    } else {
                                        setOrdes([])
                                    }
                                    setProcess(false)
                                }).catch(e => setProcess(false))

                            }}>Diário geral</button>
                        </td>
                    </tr>))}
                </tbody>
            </table></div>}

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} component="div">
                            <div style={{ backgroundColor: 'white', color: 'black', height: 'auto', paddingLeft: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset' }}>
                                {client.client === '' ? '' :
                                    <p>{client.client} – <span style={{ color: 'green' }}>{client.clientID}</span></p>
                                }
                            </div>
                        </Typography>


                    </Toolbar>
                </AppBar>
                <DialogContent style={{ fontSize: '13px' }}>
                    {process ? <div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '25px', marginBottom: '-100px' }}>A processar...</span>
                            <div class="loader-line" style={{ marginTop: '0px' }}></div>
                        </div>
                    </div> :
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Pendentes" {...a11yProps(0)} />
                                    <Tab label="Concluídos" {...a11yProps(1)} />
                                    <Tab label="Cancelados" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <ClientTabs client={ordes} role='pending' />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                {ordes.length == 0 ? <span></span> : <p style={{ textAlign: 'center' }}><button type="button" class="btn btn-info"
                                    onClick={() => {
                                        setPrinting(true)
                                        const myDatas = ordes.filter(elem => elem.ordem_status === 'done')
                                        console.log(myDatas)
                                        const data = {
                                            ordes: myDatas
                                        }
                                        axios.post('/api/getInvoiceReport', data).then(res => {
                                            console.log(res);
                                            const fileBuffer = Buffer.from(res.data.doc, 'base64')
                                            const blob = new Blob([fileBuffer], {
                                                type: 'application/pdf'
                                            })
                                            const fileURL = URL.createObjectURL(blob)
                                            window.open(fileURL)
                                            setPrinting(false)
                                        })
                                    }}
                                >Emitir factura <ReceiptIcon /></button>
                                    {printing ? <div style={{ marginTop: '10px'}}>
                                        <span style={{ fontSize: '13px' }}>A processar relatorio...</span>
                                        <div class="loader-line" style={{ marginTop: '0px', marginBottom: '0px' }}></div>
                                    </div>: <span></span>}
                                </p>}
                                <hr></hr>
                                <ClientTabs client={ordes} role='done' />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <ClientTabs client={ordes} role='canceled' />
                            </CustomTabPanel>
                        </Box>}
                </DialogContent>
            </Dialog>
        </div >)
}



export default Client