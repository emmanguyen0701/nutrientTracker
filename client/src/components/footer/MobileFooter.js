import React from "react"

import { Box } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

import logo from '../../../public/images/imageedit_7_7726880872.png'


const MobileFooter = () => (
  <Box sx={{
    minHeight: '270px',
    marginTop: 'auto',
    bgcolor: 'primary.main',
    color: 'white',
    pb: '10px',
    }}>
    <div 
    style={{display: 'flex',
    justifyContent: 'space-around',
    fontSize: '12px',
    height: '50%'}}>
      <ul style={{
        paddingLeft: '0',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        <li>NEWS</li>
        <li>CHANNELS</li>
        <li>TIMELINE</li>
      </ul>
      <ul style={{
        paddingLeft: '0',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        <li>HEALTH</li>
        <li>CULTURE</li>
        <li>WEATHER</li>
      </ul>
      <ul style={{
        paddingLeft: '0',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        <li>MUSIC</li>
        <li>MOVIES</li>
        <li>RADIO</li>
      </ul>
    </div>
    <div style={{
        width: '50%',
        margin: '0 auto 20px',
        display: 'flex',
        justifyContent: 'space-evenly'}}>
        <FacebookIcon sx={{ fontSize: '20px' }} />
        <InstagramIcon sx={{ fontSize: '20px' }} />
        <TwitterIcon sx={{ fontSize: '20px' }} />
    </div>
    <hr />
    <div style={{    
        display: 'flex',
        width: '90%',
        margin: '0 auto',
        justifyContent: 'space-between',
        fontSize: '14px'
    }}>
        <div style={{width: '100px', paddingTop: '5px'}}>
        <img style={{ color: 'white', width: '70px', height: '70px' }} 
        src={logo} alt="Nutrient-tracker" />
      </div>
      <p style={{fontWeight: 'bold', paddingTop: '17px' }}>&copy; 2022 EMMA NGUYEN</p>
    </div>
  </Box>
);

export default MobileFooter;
