import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
  
        try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);                           //instead of fetch
        this.result = res.data.recipes;

    }
    catch(error){
        console.log(error);
    }
}
}