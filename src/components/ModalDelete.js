export default function ModalDelete({deleteJour,handleDelete}) {
    //console.log(deleteJour);
    return (
        <>           
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Vous êtes sûr de vouloir supprimer:</p>
                            <p>{deleteJour.date}</p>
                            <p>{deleteJour.libelle}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={()=>handleDelete(deleteJour)} type="button" className="btn btn-danger" data-bs-dismiss="modal" >Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}