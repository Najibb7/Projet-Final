export default function Gestionrows({ setSelectedAb,data ,setAffichage}) {
    document.getElementsByClassName('class1').className = "class1 btn btn-sm btn-info me-1 "

    if (data.status=== "VALIDEE") {
        return (
        
            <tr>
                <td>{data.debut}</td>
                <td>{data.fin}</td>
                <td>{data.type}</td>
                <td>{data.status}</td>
                <td>
                    <button onClick={()=>setSelectedAb()} className="btn btn-sm btn-danger " data-bs-toggle="modal" data-bs-target="#exampleModal">✖︎</button>
                </td>
            </tr>
        
    );
    } else{
        return (
            
                <tr>
                    <td>{data.debut}</td>
                    <td>{data.fin}</td>
                    <td>{data.type}</td>
                    <td>{data.status}</td>
                    <td><button onClick={()=>{setSelectedAb();setAffichage("add")}} className="class1 btn btn-sm btn-info me-1">✎</button>
                        <button onClick={()=>setSelectedAb()} className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">✖︎</button>
                    </td>
                </tr>
            
        );
    }
}