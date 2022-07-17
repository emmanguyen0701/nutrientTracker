import React from 'react'

import { Grid } from '@mui/material'

import useWindowDimension from '../hook/useWindowDimension'
import Article from './Article'

// All images are under Unsplash License.
const ARTICLES = [
    { subtitle: 'MATERNAL HEALTH', title: 'How Maternal Diets Affect Mental Health of Unborn Child', link: 'https://pubmed.ncbi.nlm.nih.gov/24074470/', image: 'pregnant-women.jpg'},
    { subtitle: 'NUTRITION', title: 'Know The Facts about Fats', link: 'https://www.health.harvard.edu/staying-healthy/know-the-facts-about-fats#:~:text=%22Fat%20helps%20give%20your%20body,of%20what%20it%20needs%20most.%22', image: 'fats.jpg' },
    { subtitle: 'NUTRITION', title: 'Is Fast Food Bad For You?', link: 'https://www.medicalnewstoday.com/articles/324847', image: 'fast-food.jpg' },
    { subtitle: 'NUTRITION', title: 'Stop Counting Calories', link: 'https://www.health.harvard.edu/staying-healthy/stop-counting-calories', image: 'counting-calories.jpg' },
    { subtitle: 'HEART HEATH', title: 'The Sweet Danger of Sugar', link: 'https://www.health.harvard.edu/heart-health/the-sweet-danger-of-sugar', image: 'sugar.jpg' },
    { subtitle: 'MENTAL HEALTH', title: 'Diabetes and Cognitive Decline', link: 'https://www.alz.org/media/Documents/alzheimers-dementia-diabetes-cognitive-decline-ts.pdf', image: 'walking.jpg' },
    
]

const HealthyInfo = () => {
    const isMobile = useWindowDimension() <= 860

    return (
        <Grid container sx={{ paddingLeft: isMobile ? 0 : '10px', marginTop: '30px' }}>
            {ARTICLES.map((article, idx) => (
            <Grid item xs={12} sm={6} md={4}  key={idx} > 
                <Article 
                    subtitle={article.subtitle} 
                    title={article.title} 
                    link={article.link} 
                    image={article.image} />
            </Grid>
            ))}
        </Grid>
    )
}

export default HealthyInfo