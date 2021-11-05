import axios from "axios";
import {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import sampleImage from './images/sample.jpeg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


const Articles = () => {

    useEffect(() => {
        axios.get('https://dev-devsayeem.pantheonsite.io/jsonapi/node/article')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    });

    return ( 
        <div className="articleContainer">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* run loop here */}
                    <Grid item xs={6} md={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image={sampleImage}
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
 
export default Articles;