import React from "react"

import { Box } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

import logo from '../../../public/images/imageedit_7_7726880872.png'

const Footer = () => (
  <Box sx={{ 
    minHeight: '220px',
    padding: 0,
    marginTop: 'auto',
    bgcolor: 'primary.main',
    color: 'white'}}>
    <div style={{ 
        height: '130px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 40px'
    }}>
      <div className="logo">
        <img style={{ color: 'white', width: '70px', height: '70px' }} 
         src={logo} alt="Nutrient-tracker" />
      </div>
      <div style={{ display: 'flex', 
        justifyContent: 'space-around',
        width: '45vw',
        height: '80%' }}>
        <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontSize: '12px'
        }}>
          <li>NEWS</li>
          <li>CHANNELS</li>
          <li>TIMELINE</li>
        </ul>
        <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontSize: '12px'
        }}>
          <li>HEALTH</li>
          <li>CULTURE</li>
          <li>WEATHER</li>
        </ul>
        <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontSize: '12px'
        }}>
          <li>MUSIC</li>
          <li>MOVIES</li>
          <li>RADIO</li>
        </ul>
      </div>
    </div>
    <hr />
    <div style={{
            margin: '0 40px',
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
      <p style={{fontSize: '0.85em', fontWeight: '600'}}>&copy; 2022 EMMA NGUYEN</p>
      <div style={{
        display: 'flex',
        width: '12%',
        justifyContent: 'space-between',
        cursor: 'text'}}>
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
      </div>
    </div>
  </Box>
);

export default Footer;
