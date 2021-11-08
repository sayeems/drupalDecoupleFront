import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const Single = ({match}) => {

    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState();
    const [image, setImage] = useState();
    const baseUrl = 'https://dev-devsayeem.pantheonsite.io/';
    const articleId = match.params.id;

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const data = await axios.get(`${baseUrl}jsonapi/node/article/${articleId}?include=field_image&fields[file--file]=uri,url`);
            setArticle(data.data.data);
            // let imageData = baseUrl+data.data.included[0].attributes.uri.url;
            setImage(baseUrl+data.data.included[0].attributes.uri.url);
            setLoading(false);
        }
        return fetchContent();
    },[]);

    return ( 
        <div className="articleContainer">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* run loop here */}
                    {!loading && 
                        <Grid item xs={12}>
                            <Card>
                            <CardMedia
                            component="img"
                            image={image}
                            alt=""
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.attributes.title}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: article.attributes.body.processed }}></div>
                            </CardContent>
                            </Card>
                        </Grid>
                    }
                    {loading && 
                        <Grid item xs={12}>
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
                    
                    }
                </Grid>
            </Container>
        </div>
    );
}
 
export default Single;