import React, { useEffect, useState } from "react";
import './scss/ModalHandleContact.scss';
import Modal from 'react-modal';
import { GrClose } from "react-icons/gr";
import { Contact } from "../../type/contact.type";
import mainService from "../../services/main.service";

type ModalHandleContactProps = { isOpen: boolean, handleClose: () => void, currentContact: Contact };

function ModalHandleContact({ isOpen, handleClose, currentContact }: ModalHandleContactProps) {

    const [modalContact, setModalContact] = useState<Contact>(currentContact);
    const [handleCreateContact, setHandleCreateContact] = useState<number>(0);


    const customStyles = {
        content: {
            top: '0px',
            bottom: '0px',
            left: 'auto',
            position: 'absolute',
            right: '0px',
            padding: "0px",
            margin: "0px",
            width: '35vw',
            minWidth: '20rem',
            display: 'flex',
            flexDirection: 'column'
        },
    };

    useEffect(() => {
        if (modalContact.id !== -1) {
            mainService.newContact(modalContact)
                .then((res) => {
                    handleClose();
                })
                .catch(
                    (e: unknown) => console.log(e)
                );
        }
    }, [modalContact.id])


    const handleSaveContact = async (e) => {
        e.preventDefault();
        if (currentContact.id === -1) {
            //création d'un contact
            const newId = await getIdNewContact();
            setModalContact({ ...modalContact, id: newId });
        }
        else {
            //édition contact
        }
    }

    const getIdNewContact = async (): Promise<number> => {
        const contacts: Array<Contact> = await mainService.getContacts();
        return contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    }

    return (

        <Modal
            isOpen={isOpen}
            style={customStyles}
        >
            <div id="modal-header" className="row">
                <GrClose
                    id="icon-close-modal"
                    size={30}
                    onClick={handleClose}
                />
            </div>
            <div id="modal-form" className="column">
                <form onSubmit={handleSaveContact}>
                    <div className="row space-between input-wrapper">
                        <input
                            type="text"
                            placeholder="First name"
                            className="modal-input"
                            required
                            onChange={(e) => setModalContact({ ...modalContact, firstname: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder='Last name'
                            className="modal-input"
                            required
                            onChange={(e) => setModalContact({ ...modalContact, lastname: e.target.value })}
                        />
                    </div>
                    <div className="input-wrapper row">
                        <input
                            type="email"
                            placeholder="Email"
                            className="modal-input"
                            required
                            onChange={(e) => setModalContact({ ...modalContact, email: e.target.value })}
                        />
                    </div>
                    <div className="input-wrapper row">
                        <input
                            type="date"
                            placeholder="Birthday"
                            className="modal-input"
                            required
                            onChange={(e) => setModalContact({ ...modalContact, birthday: new Date(e.target.value) })}
                        />
                    </div>
                    <div className="row" id="button-wrapper">
                        <button type="submit" className="modal-button modal-button-confirm">
                            Save
                        </button>
                        <button type="reset" className="modal-button modal-button-delete">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </Modal>


    )

}

Modal.setAppElement('body');


export default ModalHandleContact;