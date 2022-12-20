import cookie from 'react-cookies';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AddAbsence({ setAffichage, selectedAb, setSelectedAb, setAbsenceList }) {

    //判断点击add还是modify返回不同页面
    const days = 0;

    let title = "";
    let action = "";
    let absence = {
        userId: cookie.load("_id"),
        userName: cookie.load("name"),
        debut: "",
        fin: "",
        status: "EN_ATTENTE",
        type: "",
        motif: "",
        days: 0
    };
    if (selectedAb._id === "") {
        title = "Demande d'absence";
        action = "add";
    } else {
        title = "Modifier d'absence";
        action = "modifier";
        absence = Object.assign({}, selectedAb)

    };




    const initAbsence = {
        userId: cookie.load("_id"),
        userName: cookie.load("name"),
        debut: "",
        fin: "",
        status: "EN_ATTENTE",
        type: "",
        motif: "",
        days: 0
    };
    const [listJf, setListJF] = useState([]);

    const urlBackend = "http://127.0.0.1:3001/";

    //console.log(absence);

    function fetchJF() {
        axios.get(urlBackend + 'jourferie').then((res) => {
            setListJF(res.data);


        })

    };
    useEffect(() => {
        fetchJF();
    }, []);
    




    //需要计算请假天数，需要判断是否有jf rttp 周六周日
    function verification() {
        const dayBegin = new Date(absence.debut);
        const dayEnd = new Date(absence.fin);
        const days = (dayEnd - dayBegin) / (60 * 60 * 24 * 1000);
        const week = dayBegin.getDay();
        const weekends = Math.floor((days - 6 + week) / 7 + 1) * 2;
        const ferieEtRttp = listJf.filter(day => (dayBegin < new Date(day.date)) && (new Date(day.date) < dayEnd) && (new Date(day.date).getDay() !== 0) && (new Date(day.date).getDay() !== 6));
        absence.days = days + 1 - weekends - ferieEtRttp.length
        //console.log(absence.days);
        if (dayBegin > dayEnd) {
            return "date begin need earlier than date fin";
        }
        //console.log(days + 1);
        //console.log(dayBegin);
        //console.log(dayEnd);
        //console.log(week);
        //console.log(weekends);
        //console.log(new Date(absence.debut));
        //ferieEtRttp= listJf.filter(day=> (dayBegin < new Date(day.date)) && (new Date(day.date)<dayEnd));
        //console.log(ferieEtRttp);

    }

    function repos(checkDate) {
        const week = new Date(checkDate).getDay();
        const checkJF = listJf.filter(day => day.date === checkDate);

        if (week === 0 || week === 6 || checkJF.length !== 0) {
            return "Non week-ends fériés ou RTT employeur.";
        }



    };

    //还要加入所选日期是否为jf rttp 或周六周日
    function handleFin(e) {
        // console.log(e.target.value);
        const errorFin = document.querySelector("#errorFin");
        absence.fin = e.target.value;
        //e.target.value="2022-12-12";


        if (repos(absence.fin)) {
            errorFin.className = "text-danger";
            errorFin.innerHTML = repos(absence.fin);
            e.target.value = "";
            absence.fin = "";
        } else if (absence.debut === "") {
            errorFin.className = "text-success";
            errorFin.innerHTML = "OK";
        } else if (verification()) {
            errorFin.className = "text-danger";
            errorFin.innerHTML = verification();
            e.target.value = "";
            absence.fin = "";
        } else {
            errorFin.className = "text-success";
            errorFin.innerHTML = "OK";

        }


    }
    //还要加入所选日期是否为jf rttp 或周六周日
    function handleDebut(e) {
        //console.log(e.target.value);
        const errorDebut = document.querySelector("#errorDebut");
        absence.debut = e.target.value;
        if (repos(absence.debut)) {
            errorDebut.className = "text-danger";
            errorDebut.innerHTML = repos(absence.debut);
            e.target.value = "";
            absence.debut = "";
        } else if (absence.fin === "") {
            errorDebut.className = "text-success";
            errorDebut.innerHTML = "OK";
        } else if (verification()) {
            errorDebut.className = "text-danger";
            errorDebut.innerHTML = verification();
            e.target.value = "";
            absence.debut = "";
        } else {
            errorDebut.className = "text-success";
            errorDebut.innerHTML = "OK";

        }

    }


    function handleType(e) {
        //console.log(e.target.value);
        const errorType = document.querySelector("#errorType");
        absence.type = e.target.value;
        if (absence.type === selectedAb.type && selectedAb.type !== "css") {
            days = selectedAb.days;
        } else { days = 0; }
        if (absence.debut === "" || absence.fin === "") {
            errorType.className = "text-danger";
            errorType.innerHTML = "Veuillez indiquer les dates de début et de fin";
            e.target.value = "";
            absence.type = "";
        } else if (absence.type === "css") {
            errorType.className = "text-success";
            errorType.innerHTML = "OK";
        }
        else if (absence.days > (parseInt(cookie.load(absence.type)) + days)) {
            errorType.className = "text-danger";
            errorType.innerHTML = "Nombre de jours restants insuffisant";
            e.target.value = "";
            absence.type = "";
        } else {
            errorType.className = "text-success";
            errorType.innerHTML = "OK";
            //console.log("cookies.days:"+typeof(cookie.load(absence.type))+cookie.load(absence.type));
            //console.log("absence.days:"+absence.days);
        };
    }
    function handleModif(e) {
        //console.log(e.target.value);
        absence.motif = e.target.value;
        const errorMotif = document.querySelector("#errorMotif");
        errorMotif.className = "text-success";
        errorMotif.innerHTML = "OK"
    }
    async function validation() {

        const errorMotif = document.querySelector("#errorMotif");
        const errorType = document.querySelector("#errorType");
        const errorValider = document.querySelector("#errorValider");
        let resultCreateAbs;
        let resultUpD;
        let resultModify;


        if (absence.debut === "" || absence.fin === "" || absence.type === "") {
            errorValider.className = "text-danger";
            errorValider.innerHTML = "Date de début,Date de fin,Type de congé sont obligatoire";
        } else if (absence.type === "css" && absence.motif === "") {
            errorMotif.className = "text-danger";
            errorMotif.innerHTML = "Congé sans solde Motif est obligatoire"
        } else if (absence.days > parseInt(cookie.load(absence.type))) {
            errorType.className = "text-danger";
            errorType.innerHTML = "Nombre de jours restants insuffisant";
        } else if (action === "add") {
            if (absence.type === "css") {


                /* console.log(absence);
                console.log(cookie.load(absence.type));
                cookie.save(absence.type,cookie.load(absence.type)-absence.days);
                console.log(cookie.load(absence.type)); */

                resultCreateAbs = await axios.post(urlBackend + 'createAbsence', absence);

                if (resultCreateAbs.status === 200) {
                    axios.post('http://127.0.0.1:3001/absence', { userId: cookie.load("_id") }).then((res) => {

                        setAbsenceList(res.data);

                        setSelectedAb();

                    });


                }
                setAffichage("");

            } else {
                /*  console.log(typeof(cookie.load(absence.type)));
                 console.log(typeof(absence.days)); */

                cookie.save(absence.type, parseInt(cookie.load(absence.type)) - absence.days);
                resultCreateAbs = await axios.post(urlBackend + 'createAbsence', absence);
                if (resultCreateAbs.status === 200) {
                    resultUpD = await axios.post(urlBackend + 'updateUser', { _id: cookie.load("_id"), cp: parseInt(cookie.load("cp")), rtt: parseInt(cookie.load("rtt")) });
                    if (resultUpD.status === 200) {
                        axios.post('http://127.0.0.1:3001/absence', { userId: cookie.load("_id") }).then((res) => {

                            setAbsenceList(res.data);

                            setSelectedAb();
                        });
                    }

                }
                setAffichage("");



            };
        } else {

            //console.log(absence);
            //console.log(selectedAb);
            absence.status="EN_ATTENTE";
            resultModify = await axios.post('http://127.0.0.1:3001/updateAbsence', absence);
            if (resultModify.status === 200) {
                if (selectedAb.type !== "css") {
                    cookie.save(selectedAb.type, parseInt(cookie.load(selectedAb.type)) + selectedAb.days);
                }

                if (absence.type !== "css") {
                    cookie.save(absence.type, parseInt(cookie.load(absence.type)) - absence.days);
                }
                resultUpD = await axios.post(urlBackend + 'updateUser', { _id: cookie.load("_id"), cp: parseInt(cookie.load("cp")), rtt: parseInt(cookie.load("rtt")) });
                if (resultUpD.status === 200) {
                    axios.post('http://127.0.0.1:3001/absence', { userId: cookie.load("_id") }).then((res) => {

                        setAbsenceList(res.data);


                    });
                }

            }
            setSelectedAb();
            setAffichage("");
        }



    }







    return (

        <div className="container d-flex flex-column align-items-center">
            <div className="row "><h4>{title}</h4></div>
            <div className="row w-75 ">
                <form action="" className="w-75">


                    <table className="table ">
                        <tbody>
                            <tr>
                                <td><label htmlFor="debut" className="form-label">Date de début</label></td>
                                <td><input onChange={(e) => handleDebut(e)} type="date" className="form-control" id="debut" name="debut" defaultValue={selectedAb.debut} /></td>

                            </tr>
                            <tr><td colSpan="2"><p id='errorDebut'></p></td></tr>
                            <tr>
                                <td><label htmlFor="fin" className="form-label">Date de fin</label></td>
                                <td><input onChange={(e) => handleFin(e)} type="date" className="form-control" id="fin" name="fin" defaultValue={selectedAb.fin} /></td>
                            </tr>
                            <tr><td colSpan="2"><p id='errorFin'></p></td></tr>
                            <tr>
                                <td><label htmlFor="type" className="form-label">Type de congé</label></td>
                                <td><select onChange={(e) => handleType(e)} className="form-select" id="type" name="type" defaultValue={selectedAb.type} >
                                    <option value="">Sélectionnez le type</option>
                                    <option value="css">Congé sans solde</option>
                                    <option value="cp">Congé payé</option>
                                    <option value="rtt">RTT</option>
                                </select></td>

                            </tr>
                            <tr><td colSpan="2"><p id='errorType'></p></td></tr>
                            <tr>
                                <td><label htmlFor="motif" className="form-label">Motif</label></td>
                                <td><textarea onChange={(e) => handleModif(e)} className="form-control" id="motif" name="motif" rows="5" defaultValue={selectedAb.motif} ></textarea></td>

                            </tr>
                            <tr><td colSpan="2"><p id='errorMotif'></p></td></tr>
                        </tbody>
                    </table>


                    <p id='errorValider'></p>
                    <div className="d-flex flex-row justify-content-evenly m-2">

                        <input onClick={() => { setAffichage(""); setSelectedAb() }} type="reset" className="btn btn-danger" value="Annuler" />
                        <input onClick={() => validation()} type="button" className="btn btn-success" value="Valider" />
                    </div>

                </form>
            </div>
        </div>

    );
}