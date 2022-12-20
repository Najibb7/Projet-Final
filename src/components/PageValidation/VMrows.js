export default function VMrows({ data, handleValide,handleDelete }) {

    return (
        <tr key={data.id}>
        <td>{data.debut}</td>
        <td>{data.fin}</td>
        <td>{data.type}</td>
        <td>{data.userName}</td>
        <td>
            <button className='btn btn-outline-success mx-3' onClick={()=>handleValide()} >✅</button>
            <button className='btn btn-outline-warning' onClick={()=>handleDelete()}>❌</button>
        </td>
    </tr>
    );
}