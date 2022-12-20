export default function JFrows({ role, data }) {

 /*    function userRole() {
        const jfrow = document.querySelector("#jfrow");
        const tdAdmin = document.createElement("td");
        const modifyAdmin = document.createElement("a");
        const deleteAdmin = document.createElement('a');
        if (role !== "user") {
            modifyAdmin.className = "btn btn-sm btn-info me-1";
            modifyAdmin.innerHTML = "✎";
            deleteAdmin.className = "btn btn-sm btn-danger";
            deleteAdmin.innerHTML = "✖︎";
            tdAdmin.appendChild(modifyAdmin);
            tdAdmin.appendChild(deleteAdmin);
            jfrow.appendChild(tdAdmin);
        }

    }; */

    return (
        <>
            
                <td>{data.date}</td>
                <td>{data.type}</td>
                <td>{data.jour}</td>
                <td>{data.libelle}</td>
                {/* <td><a onClick={()=>setAffichage("modify")} className="btn btn-sm btn-info me-1">✎</a>
                    <a className="btn btn-sm btn-danger">✖︎</a>
                </td> */}
                {/* {
                    userRole()
                } */}
            
        </>
    );
}