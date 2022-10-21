import React, { useEffect, useState } from "react";
import './scss/ModalHandleContact.scss';
import Modal from 'react-modal';
import { GrClose } from "react-icons/gr";

type ModalHandleContactProps = { isOpen: boolean, handleClose: () => void };

function ModalHandleContact({ isOpen, handleClose }: ModalHandleContactProps) {

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
                <form>
                    <div className="row space-between input-wrapper">
                        <input type="text" placeholder="First name" className="modal-input" required />
                        <input type="text" placeholder='Last name' className="modal-input" required />
                    </div>
                    <div className="input-wrapper row">
                        <input type="email" placeholder="Email" className="modal-input" required />
                    </div>
                    <div className="input-wrapper row">
                        <input type="date" placeholder="Birthday" className="modal-input" required />
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


export default ModalHandleContact;