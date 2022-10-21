import React, { useEffect, useState } from "react";
import './scss/Directory.scss';
import mainService from "../../services/main.service";
import ModalHandleContact from "../modalHandleContact/ModalHandleContact";
import { Contact } from "../../type/contact.type";


function Directory() {

    const [showModalHandleContact, setShowModalHandleContact] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        mainService.getContacts().then(setContacts).catch(
            (e: unknown) => console.log(e)
        );
    }, []);

    const formatDate = (date: Date): string => {
        return date.toLocaleString('fr', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    // const fetchData = async (): Promise<Contact[]> => {
    //     try {
    //         return await mainService.getContacts();
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    const renderContactList = contacts.map((contact, index) => {
        return (
            <div className="contact-wrapper column" key={index} onClick={() => { setShowModalHandleContact(true) }}>
                <div className="contact-information column">
                    <span>{contact.firstname} {contact.lastname}</span>
                    <span>{contact.email}</span>
                    <span>{formatDate(contact.birthday)}</span>
                </div>
            </div>
        )
    })

    return (
        <div id="directory">
            <div id="directory-content" className="column">
                <div id="directory-header" className="row">
                    <input type="text" placeholder="search" />
                    <div id="button-new-contact">
                        <span>New</span>
                    </div>
                </div>
                <div id="contact-list" className="column">
                    {renderContactList}
                </div>
            </div>
            <ModalHandleContact
                isOpen={showModalHandleContact}
                handleClose={() => setShowModalHandleContact(false)}
            />
        </div>
    )

}


export default Directory;