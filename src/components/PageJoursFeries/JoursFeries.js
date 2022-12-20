import { useEffect, useState } from "react";
import JFadmin from "./JFadmin";
import JFuser from "./JFuser";
import axios from "axios";
import AddJF from "./AddJF";
import cookie from 'react-cookies';

export default function JoursFeries() {
    let resultAxios;
    const [jfs, setJfs] = useState([]);
    const urlBackend = "http://127.0.0.1:3001/";

    function fetchJF() {
        axios.get(urlBackend + 'jourferie').then((res) => {
            setJfs(res.data);
        })
    };

    const [selectedJour, setSelectedJour] = useState({
        _id: "",
        date: "",
        type: "",
        jour: "",
        libelle: ""
    });

    let type = selectedJour.type;

    const initSelected = {
        _id: "",
        date: "",
        type: "",
        jour: "",
        libelle: ""
    };

    const addJour = {
        _id: "",
        date: "",
        type: "add",
        jour: "",
        libelle: ""
    }

    function handleAdd(obj) {
        setSelectedJour(obj);
        //console.log(selectedJour);
    }

    //selectedJour.jour属性需要在这里计算

    function handleDate(e) {
        //console.log(e.target.value);
        selectedJour.date = e.target.value;
        const date = new Date(selectedJour.date);
        const index = date.getDay();
        const week = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        selectedJour.jour = week[index];
        //console.log(date);
        //console.log(selectedJour.jour);
    };

    function handleType(e) {
        //console.log(e.target.value);
        selectedJour.type = e.target.value;
    };

    function handLibelle(e) {
        //console.log(e.target.value);
        selectedJour.libelle = e.target.value;
    };

    async function valitation() {
        const errorValider = document.querySelector("#errorValider");
        errorValider.className = "text-danger";
        if (selectedJour.date === "" || selectedJour.type === "" || selectedJour.libelle === "") {
            errorValider.innerHTML = "Date Type et Motif sont obligatoires !";
        } else if (selectedJour.type === "RTT Employeur" && checkJFW(selectedJour.date)) {
            errorValider.innerHTML = checkJFW(selectedJour.date);
        } else if (!selectedJour._id) {
            delete selectedJour._id;
            if (selectedJour.type === "Jour Férié") {
                resultAxios = await axios.post(urlBackend + 'addjourferie', selectedJour).then((res) => {
                    setJfs(res.data);
                    return ("OK");
                });
                setSelectedJour(initSelected);
            } else if (parseInt(cookie.load("rttp")) > 0) {
                resultAxios = await axios.post(urlBackend + 'addjourferie', selectedJour).then((res) => {
                    setJfs(res.data);
                    return ("OK");
                });
                if (resultAxios === "OK") {
                    resultAxios = await axios.post(urlBackend + 'updateRttp', { rttp: parseInt(cookie.load("rttp")), newRttp: (parseInt(cookie.load("rttp")) - 1) });
                    cookie.save("rttp", parseInt(cookie.load("rttp")) - 1);
                }
                setSelectedJour(initSelected);
            } else {
                errorValider.innerHTML = "Il ne reste plus assez de RTT Employeur";
            };
        } else {
            resultAxios = await axios.post(urlBackend + 'updatejourferie', selectedJour).then((res) => {
                setJfs(res.data);
            });
            if (type !== selectedJour.type) {
                if (type === "Jour Férié") {
                    resultAxios = await axios.post(urlBackend + 'updateRttp', { rttp: parseInt(cookie.load("rttp")), newRttp: (parseInt(cookie.load("rttp")) - 1) });
                    cookie.save("rttp", parseInt(cookie.load("rttp")) - 1);
                } else {
                    resultAxios = await axios.post(urlBackend + 'updateRttp', { rttp: parseInt(cookie.load("rttp")), newRttp: (parseInt(cookie.load("rttp")) + 1) });
                    cookie.save("rttp", (parseInt(cookie.load("rttp")) + 1));
                }
            };
            setSelectedJour(initSelected);
        };
    };

    async function handleDelete(obj) {
        resultAxios = await axios.post(urlBackend + 'deletejourferie', obj).then((res) => {
            setJfs(res.data);
            return ("OK");
        });
        if (resultAxios === "OK" && obj.type === "RTT Employeur") {
            resultAxios = await axios.post(urlBackend + 'updateRttp', { rttp: parseInt(cookie.load("rttp")), newRttp: (parseInt(cookie.load("rttp")) + 1) });
            cookie.save("rttp", (parseInt(cookie.load("rttp")) + 1));
        }
    };

    function checkJFW(checkDate) {
        const week = new Date(checkDate).getDay();
        const checkJF = jfs.filter(day => day.date === checkDate);
        if (week === 0 || week === 6 || checkJF.length !== 0) {
            return "Non week-ends fériés pour RTT employeur.";
        }else return false;
    };

    useEffect(() => { fetchJF() }, []);
    if (selectedJour.type !== "") {
        return (<AddJF valitation={() => valitation()} handleType={(e) => handleType(e)} handLibelle={(e) => handLibelle(e)} handleDate={(e) => handleDate(e)} handleAdd={() => handleAdd(initSelected)} selectedJour={selectedJour} />);
    } else if (cookie.load("role") === "user") {
        return (
            <JFuser joursferies={jfs} />
        );
    } else {
        return (
            <JFadmin handleDelete={(obj) => handleDelete(obj)} addJour={addJour} handleAdd={(obj) => handleAdd(obj)} joursferies={jfs} />
        );
    }
}