import axios from "axios";
import {useState, useEffect} from "react";


const Articles = () => {

    useEffect(() => {
        axios.get('http://dev-devsayeem.pantheonsite.io/jsonapi/node/article')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    });

    return ( 
        <h1>Decoupled app</h1>
    );
}
 
export default Articles;