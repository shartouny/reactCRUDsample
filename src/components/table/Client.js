
export default function Client({data, clickAction, onCheckboxChange}){
    const handleOnChange = (e) =>{
        onCheckboxChange(parseInt(e.target.value), e.target.checked)
    }
    return (
        <tr>
            <th scope="col">
                <input 
                    className="mx-auto"
                    checked={data.selected} 
                    type="checkbox" 
                    value={data.id} 
                    onChange={handleOnChange}
                />
            </th>
            <th scope="row">{data.id}</th>
            <td>{data.name}</td>
            <td>{data.family}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-success mr-2" 
                    onClick={() => clickAction('Edit', data)}>
                        <i className="fas fa-edit"></i>
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => clickAction('Delete', data)}>
                        <i className="far fa-trash-alt"></i>
                </button>
            </td>
        </tr>
        )
}

