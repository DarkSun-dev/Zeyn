
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { LinearProgress } from '@material-ui/core'
import './../assets/css/load.css'

function TypographyDemo(props) {
    const { loading = false } = props
    return (
        <div>
            <Typography component="div">
                {loading ? <LinearProgress /> : <LinearProgress />}
            </Typography>
        </div>
    )
}

TypographyDemo.propTypes = {
    loading: PropTypes.bool,
}

export default function Loger({ text }) {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
            <span style={{fontSize: '40px', marginBottom: '-100px'}}> <strong><em><span style={{ color: 'red' }}>O</span><span style={{ color: 'black' }}>rders</span></em></strong></span>
                <div class="loader-line" style={{marginTop: '-5px'}}></div>
            </div>        
        </div>
    )
}