import axios from "axios";
import { Contact, ContactEntity } from "../type/contact.type";

class mainService {

    constructor() {
        axios.defaults.withCredentials = false;
    }

    public getContacts = async (): Promise<Contact[]> => {
        return new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:3001/contacts', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data.map((contact: ContactEntity): Contact => {
                        return { ...contact, birthday: new Date(contact.birthday) };
                    })
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

    public newContact = async (form: Contact): Promise<Contact> => {
        return new Promise((resolve, reject) => {
            axios.post('http://127.0.0.1:3001/contacts', form, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

    public editContact = async (form: Contact, id: number): Promise<Contact> => {
        return new Promise((resolve, reject) => {
            axios.put(`http://127.0.0.1:3001/contacts/${id}`, form, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

    public deleteContact = async (id: number): Promise<Contact> => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://127.0.0.1:3001/contacts/${id}`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((response) => resolve(
                    response.data
                ))
                .catch((error) =>
                    reject(error)
                )
        })
    };

}

export default new mainService();