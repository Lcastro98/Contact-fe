
import axios from 'axios';

export class ContactService {
    baseUrl = "http://localhost:8080/";
    getAll(){
        return axios.get(this.baseUrl + "contacts").then(res => res.data.data);
    }
}