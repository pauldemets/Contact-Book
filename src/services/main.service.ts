import axios from "axios";

class mainService {

    constructor() {
        axios.defaults.withCredentials = false;
    }

    public fetchMainData = async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:3000/test', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then(function (response) {
                    // console.log("salut", response);
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    };

}

export default new mainService();