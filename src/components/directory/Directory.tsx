import React, { useEffect, useState } from "react";
import './scss/Directory.scss';
import mainService from "../../services/main.service";
import ModalHandleContact from "../modalHandleContact/ModalHandleContact";
import { Contact } from "../../type/contact.type";
import { defaultContact } from "../../services/constants/defaultContact.constants";


function Directory() {

    const [showModalHandleContact, setShowModalHandleContact] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactsList, setContactsList] = useState<Contact[]>([]);
    const [refreshData, setRefreshData] = useState<number>(0);
    const [currentSelectedContact, setCurrentSelectedContact] = useState<Contact>({ ...defaultContact });
    const [searchContact, setSearchContact] = useState<string>("");

    useEffect(() => {
        mainService.getContacts()
            .then((contacts) => {
                setContacts(contacts);
                setContactsList(contacts);
            })
            .catch(
                (e: unknown) => console.log(e)
            );
    }, [refreshData]);

    const formatDate = (date: Date): string => {
        return date.toLocaleString('fr', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    useEffect(() => {
        searchContact.length > 0 ?
            setContactsList(
                contactsList.filter(contact =>
                    `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(searchContact.toLowerCase()))
            )
            :
            setContactsList(contacts);
    }, [searchContact])

    const handleClickContact = (contact) => {
        setCurrentSelectedContact(contact);
        setShowModalHandleContact(true);
    }

    const handleNewContact = () => {
        setCurrentSelectedContact({ ...defaultContact });
        setShowModalHandleContact(true);
    }

    const handleCloseModal = () => {
        setRefreshData(refreshData + 1);
        setShowModalHandleContact(false);
    }


    const renderContactList = contactsList.map((contact, index) => {
        return (
            <div className="contact-wrapper column" key={index} onClick={() => { handleClickContact(contact) }}>
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
                    <input type="text" placeholder="search" onChange={(e) => setSearchContact(e.target.value)} />
                    <div id="button-new-contact" onClick={handleNewContact}>
                        <span>New</span>
                    </div>
                </div>
                <div id="contact-list" className="column">
                    {renderContactList}
                </div>
            </div>
            <ModalHandleContact
                isOpen={showModalHandleContact}
                handleClose={handleCloseModal}
                currentContact={currentSelectedContact}
                handleRefreshList={() => setRefreshData(refreshData + 1)}
            />
        </div>
    )

}


export default Directory;