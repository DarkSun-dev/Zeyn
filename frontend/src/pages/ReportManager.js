import Header from "../components/Header"
import HomeIcon from '@mui/icons-material/Home'
import { Button } from 'bootstrap-4-react'
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from "../components/MyDocument";
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer'
import { Buffer } from 'buffer'
import axios from "axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useState } from "react";
import Periodic from "../components/Report/Periodic";
import Account from "../components/Report/Account";

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


const ReportManager = ({ user, isLoggedIn }) => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => { setValue(newValue); }
    

    return (
        <div>
            <Header user={user} isLoggedIn={isLoggedIn} />
            <Button style={{ marginTop: '0px' }} secondary outline
                onClick={() => window.location.href = '/'}
            ><span> <strong><em><span>Menu</span></em></strong></span> <HomeIcon /></Button>
            <hr></hr>
            <div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Relatórios periódicos" {...a11yProps(0)} />
                            <Tab label="Relatório de conta" {...a11yProps(1)} />
                            <Tab label="Features" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Periodic />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                       <Account />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                       <h1>Features</h1>
                    </CustomTabPanel>
                </Box>
            </div>

        </div>)
}
export default ReportManager


/*

            <button type="button" class="btn btn-primary" onClick={() => {
                axios.get('/api/getReport').then(res => {
                    console.log(res);
                    const fileBuffer = Buffer.from(res.data.doc, 'base64')
                    const blob = new Blob([fileBuffer], {
                        type: 'application/pdf'
                    })
                    const fileURL = URL.createObjectURL(blob)
                    window.open(fileURL)
                })
            }} >REPORT</button>
              axios.get('/api/rangeDate').then(res => {
                        console.log(res)
                    })
*/

