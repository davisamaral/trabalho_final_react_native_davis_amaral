import axios from "axios";

const ApiConn = axios.create({  baseURL: 'https://fiap-reactjs-presencial.herokuapp.com/' });

export default ApiConn;
