import { useState, useEffect } from 'react';
import VMrows from './VMrows';
import axios from 'axios'
export default function VueValidation() {
    const [demandes, setDemandes] = useState([]);
    const urlBackend = "http://127.0.0.1:3001/";

    function fetchDemandes() {
        axios.get(urlBackend + 'validation').then((res) => {
            setDemandes(res.data);
        })
    };

    async function handleValide(obj) {
        await axios.post(urlBackend + 'validee', obj);
        fetchDemandes()
    }

    async function handleDelete(obj) {
        
        let result= await axios.post(urlBackend+'rejetee', obj)
        if (result.status === 200 && obj.type !== "css") {
            result = await axios.post(urlBackend+'finduser', obj)
            if (obj.type === "cp") {
                result.data.cp = result.data.cp + obj.days;
            } else {
                result.data.rtt = result.data.rtt + obj.days;
            }
            result= await axios.post(urlBackend+ 'updateUser', result.data);
        }
        fetchDemandes()
    }

    useEffect(() => { fetchDemandes() }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <div className="row text-center mt-3">
                    <h1 >Validation des demandes</h1>
                </div>
                <div id="tableContainer" className="row w-75" >
                    <table className='table table-striped table-hover'>
                        <thead className="table-dark">
                            <tr>
                                <th ><strong>Date de début</strong></th>
                                <th ><strong>Date de fin</strong></th>
                                <th ><strong>Type</strong></th>
                                <th ><strong>Nom</strong></th>
                                <th ><strong>Action</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                demandes.map(data => {
                                    //console.log(data);
                                    return (
                                            <VMrows key={crypto.randomUUID()} data={data} handleValide={()=>handleValide(data)} handleDelete={()=>handleDelete(data)}/>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}