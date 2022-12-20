import { useState, useEffect } from "react";
import Gestionrows from "./Gestionrows";
import cookie from 'react-cookies';
import axios from "axios";
import ModalDeleteGDA from "./ModalDeleteGDA";
import AddAbsence from "./AddAbsence";
import ModifyAbsence from "./ModifyAbsence";
//import './gestiondefault.css'
export default function GestionDefault() {
    const [absenceList, setAbsenceList] = useState([]);
    const [affichage, setAffichage] = useState("default")
    const [selectedAb, setSelectedAb] = useState({
        _id: "",
        userId: "",
        userName: "",
        debut: "",
        fin: "",
        status: "",
        type: "",
        motif: "",
        days: 0
    });
    const initSelAbs = {
        _id: "",
        userId: "",
        userName: "",
        debut: "",
        fin: "",
        status: "",
        type: "",
        motif: "",
        days: 0
    };
    /* console.log(!selectedAb.id);
    selectedAb.id =12;
    selectedAb.type = "test";
    console.log(selectedAb);
    useEffect(() => { setSelectedAb(initSelAbs) }, []);
    console.log(selectedAb); */

    async function fetchAbsence() {
        axios.post('http://127.0.0.1:3001/absence', { userId: cookie.load("_id") }).then((res) => {
            setAbsenceList(res.data);
        });
        await axios.post('http://127.0.0.1:3001/finduser', {userId: cookie.load("_id")}).then((res)=>{
            cookie.save("cp",res.data.cp);
            cookie.save("rtt",res.data.rtt);
            
        })
    };
    
    useEffect(() => { fetchAbsence() }, []);


    async function handleDelete() {
        /*  console.log(typeof(cookie.load(selectedAb.type)));
         console.log(typeof(selectedAb.days));
         console.log(selectedAb.days+parseInt(cookie.load(selectedAb.type))); */
        let resultDel;
        let resultUp;

        resultDel = await axios.post('http://127.0.0.1:3001/deleteAbsence', selectedAb);
        console.log("resultDel");
        if (resultDel.status === 200) {
            if (selectedAb.type !== "css") {
                cookie.save(selectedAb.type, (parseInt(cookie.load(selectedAb.type)) + selectedAb.days));
                resultUp = await axios.post('http://127.0.0.1:3001/updateUser', { _id: cookie.load("_id"), cp: parseInt(cookie.load("cp")), rtt: parseInt(cookie.load("rtt")) });
                console.log(resultUp);
            }

            axios.post('http://127.0.0.1:3001/absence', { userId: cookie.load("_id") }).then((res) => {
                setAbsenceList(res.data);

                setSelectedAb(initSelAbs);
            });
        };



    };




    switch (affichage) {
        case "add":
            return (
                <>
                    <AddAbsence setAffichage={(newState)=>setAffichage(newState)} setAbsenceList={(newData) => setAbsenceList(newData)} selectedAb={selectedAb} setSelectedAb={()=>setSelectedAb(initSelAbs)}  />
                </>
            );

        default:

            return (
                <>
                    <div className="container d-flex flex-column align-items-center">
                        <div className="row text-center mt-3">
                            <h1 >Gestion des absences</h1>
                        </div>
                        <div id="tableContainer" className="row w-75" >
                            <table className='table table-striped table-hover'>
                                <thead className="table-dark">
                                    <tr>
                                        <th ><strong>Date de début</strong></th>
                                        <th ><strong>Date de fin</strong></th>
                                        <th ><strong>Type</strong></th>
                                        <th ><strong>Status</strong></th>
                                        <th ><strong>Action</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        absenceList.map(data => {
                                            //console.log(data);
                                            return (<Gestionrows key={data._id} setSelectedAb={() => setSelectedAb(data)} data={data} setAffichage={(newState)=>setAffichage(newState)}/>);
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className="d-flex flex-row-reverse align-items-center w-75 mt-5">
                            <a onClick={() => setAffichage("add")} className="btn btn-sm btn-info me-1"><span className="material-symbols-outlined">
                                add
                            </span>
                            </a>
                            <h4>Demander une absence</h4>
                        </div>
                        <div className="d-flex flex-column align-items-start w-75">
                            <h6>Soldes des compteurs:</h6>

                            <ul>
                                <li>Congés payés:{cookie.load('cp')}</li>
                                <li>RTT:{cookie.load('rtt')}</li>
                            </ul>
                        </div>

                    </div>
                    <div><ModalDeleteGDA setSelectedAb={() => setSelectedAb(initSelAbs)} selectedAb={selectedAb} handleDelete={() => handleDelete()} /></div>


                </>
            );


    }

}