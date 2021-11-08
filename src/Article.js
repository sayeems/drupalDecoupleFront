import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import sampleImage from './images/sample.jpeg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


const Articles = () => {

    // https://dev-devsayeem.pantheonsite.io/jsonapi/node/article?fields[node--article]=uid,body,field_image,title,created&include=uid
    //
    const baseUrl = 'https://dev-devsayeem.pantheonsite.io/';
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const articles = await axios.get(`${baseUrl}jsonapi/node/article?fields[node--article]=uid,field_summary,field_image,body,title,created&include=field_image`);
            let articleData = articles.data.data;
            let articleImage = articles.data.included;
            const articleFiltered = articleData.map(d=>{
                let imageId = d.relationships.field_image.data.id;
                articleImage.map(i=>{
                    if(i.id == imageId){
                        d.image = i.attributes.uri.url;
                    }
                });
                return d;
            });
            setArticles(articleFiltered);
            setLoading(false);
        }
        return fetchContent();
    },[]);

    return ( 
        <div className="articleContainer">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* run loop here */}
                    {!loading && articles.map(single=>(
                        <Grid item xs={12} md={4} key={single.id}>
                            <Card sx={{ maxWidth: 600 }}>
                                <CardActionArea component={Link} to={`/${single.id}`}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={baseUrl+single.image}
                                    alt=""
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {single.attributes.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {single.attributes.field_summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    {loading && 
                    [1,2,3,4,5,6].map(rep=>(
                        <Grid item xs={12} md={4} key={rep}>
                            <Card sx={{ maxWidth: 600 }}>
                                <Skeleton variant="rectangular" width={600} height={118} />
                                <Skeleton sx={{mt: 1, mb:0.3}} variant="rectangular" height={16}/>
                                <Skeleton sx={{mb: 1}} variant="rectangular" height={16}/>
                                <Skeleton variant="text"/>
                                <Skeleton variant="text"/>
                                <Skeleton variant="text"/>
                                <Skeleton sx={{mb: 1}} variant="text"/>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </div>
    );
}
 
export default Articles;