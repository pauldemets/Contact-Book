import React, { useEffect } from "react";
import './scss/Home.scss';
import mainService from "../../services/main.service";

function Home() {

    useEffect(() => {
        fetchData().then((res) => {
            console.log(res);
        });
    }, []);


    const fetchData = async () => {
        try {
            const res = await mainService.fetchMainData();
            return res;
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <p>Hello world</p>
        </div>
    )

}


export default Home;