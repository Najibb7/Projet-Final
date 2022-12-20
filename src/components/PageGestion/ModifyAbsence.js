export default function ModifyAbsence({ setAffichage }) {


    return (
        <div className="container d-flex flex-column align-items-center">
            <div className="row m-5"><h4>Modification d'absence</h4></div>
            <div className="row w-75 ">
                <form action="" className="w-75">


                    <table className="table">
                        <tbody>
                        <tr>
                            <td><label htmlFor="debut" className="form-label">Date de début</label></td>
                            <td><input type="date" className="form-control" id="debut" name="debut" placeholder="debut" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="fin" className="form-label">Date de fin</label></td>
                            <td><input type="date" className="form-control" id="fin" name="fin" placeholder="fin" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="type" className="form-label">Type de congé</label></td>
                            <td><select className="form-select" id="type" name="type" defaultValue="non" >
                                <option value="non">Choose the type</option>
                                <option value="CP">Congé payé</option>
                                <option value="CSS">Congé sans solde</option>
                                <option value="RTT">RTT</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="motif" className="form-label">Motif</label></td>
                            <td><textarea className="form-control" id="motif" name="motif" rows="5"></textarea></td>
                        </tr>
                        </tbody>
                    </table>



                    <div className="d-flex flex-row justify-content-evenly m-2">
                        <input onClick={()=>setAffichage("default")} type="reset" className="btn btn-danger" value="Annuler" />
                        <input type="submit" className="btn btn-success" value="Valider" />
                    </div>

                </form>
            </div>
        </div>
    );
}