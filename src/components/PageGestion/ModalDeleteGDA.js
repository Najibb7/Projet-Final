export default function ModalDeleteGDA({setSelectedAb,selectedAb,handleDelete}) {
    
    return (
        <>           
            <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Vous êtes sûr de vouloir supprimer:</p>
                            <p>Date de début : {selectedAb.debut}</p>
                            <p>Date de fin : {selectedAb.fin}</p>
                            <p>Type de congé : {selectedAb.type}</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={()=>setSelectedAb()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={()=>handleDelete()} type="button" className="btn btn-danger" data-bs-dismiss="modal" >Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}