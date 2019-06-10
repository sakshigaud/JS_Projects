import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
  
      //  const proxy = 'https://cars-anywhere.herokuapp.com'
        const key = '2bd565aadfd6a0f47428d9b52fd7bc9e'
        try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);                           //instead of fetch
        this.result = res.data.recipes;

    }
    catch(error){
        console.log(error);
    }
}
}