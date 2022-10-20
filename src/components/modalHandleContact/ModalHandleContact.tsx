import React, { useEffect, useState } from "react";
import './scss/ModalHandleContact.scss';
import Modal from 'react-modal';
import { GrClose } from "react-icons/gr";

function ModalHandleContact({ isOpen, handleClose }) {

    const customStyles = {
        content: {
            top: '0%',
            bottom: '0px',
            left: '70%',
            right: 'auto',
            padding: "0px",
            margin: "0px",
            width: '30%',
            // border: "solid 1px blue",
            // marginRight: '-50%',
        },
    };

    const handleCloseModal = () => {

    }

    return (
        <div id="modal" className="column">
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
            </Modal>
        </div>
    )

}


export default ModalHandleContact;