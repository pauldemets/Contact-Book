import React, { useEffect } from "react";
import './scss/Directory.scss';
import mainService from "../../services/main.service";

function Directory() {

    useEffect(() => {
        fetchData().then((res) => {
            console.log(res);
        });
    }, []);

    const CONTACTS = [
        {
            firstname: " Julien",
            lastname: " Nole",
            email: "julien@gmail.com",
            birthday: '17/02/1998'
        },
        {
            firstname: " Julien",
            lastname: " Nole",
            email: "julien@gmail.com",
            birthday: '17/02/1998'
        }
    ];


    const fetchData = async () => {
        try {
            const res = await mainService.fetchMainData();
            return res;
        }
        catch (e) {
            console.log(e);
        }
    }

    const renderContactList = CONTACTS.map((contact, index) => {
        return (
            <div className="contact-wrapper column" key={index}>
                <div className="contact-information column">
                    <span>{contact.firstname} {contact.lastname}</span>
                    <span>{contact.email}</span>
                    <span>{contact.birthday}</span>
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
        </div>
    )

}


export default Directory;