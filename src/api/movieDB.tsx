import axios from 'axios';

const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie', 
    params: {
        api_key:'0b5fded12b997edbbd966e1d75dd22c6',
        language: 'es-ES',
    }
})

export default movieDB;