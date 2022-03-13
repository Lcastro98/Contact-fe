/**
 * Permite la interacción con el back-end
 * 
 * @version 1.00.00 2022-03-13 
 *
 * @author Lorena Castro <lcastro0398@gmail.com>
 */

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