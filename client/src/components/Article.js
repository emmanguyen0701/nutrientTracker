import React from 'react'

import { Box, Typography,
} from '@mui/material'

const Article = ({ subtitle, title, link, image }) => {
    const imageSrc = require(`../../public/images/articles/${image}`).default
    return (
        <Box sx={{ position: 'relative', width: '420px', maxWidth: '100%' }}>
            <a href={link} target="_blank">
                <div>
                    <img style={{ objectFit: 'contain', height: 'auto', maxWidth: '100%' }} src={imageSrc} />
                </div>
                <Box sx={{ bgcolor: 'white', paddingLeft: '10px', paddingBottom: '10px' }}>
                    <Box sx={{
                        paddingTop: '10px', 
                        width: '290px',
                        }}>
                        <Typography sx={{ fontWeight: '600', color: 'error.main', fontSize: '12px' }}>
                        {subtitle}</Typography>
                    </Box>
                    <Box sx={{ 
                        paddingTop: '10px', 
                        color: 'black', }}>
                        <Typography sx={{fontSize: '20px', fontWeight: '600' }}>{title}</Typography>
                    </Box>
                </Box>
            </a>
        </Box>
    )
}

export default Article