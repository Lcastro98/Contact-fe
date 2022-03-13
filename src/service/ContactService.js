
import axios from 'axios';

export class ContactService {
    baseUrl = "http://localhost:8080/";
    getAll(){
        return axios.get(this.baseUrl + "contacts").then(res => res.data.data);
    }

    save(contact){
        return axios.post(this.baseUrl + "contact", contact).then(res => res.data.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "contact/"+id).then(res => res.data.data);
    }
}