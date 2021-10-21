import {useEffect, useState } from "react"

export default function ManageForm({oldData, newData, error}){
    

    const id = oldData.id;
    const [name, setName] = useState(oldData.name);
    const [family, setFamily] = useState(oldData.family);

    useEffect(()=>{
        newData({id:id, name:name, family:family})
    },[id, name, family])
    
    return(
        <>
            <label className="col" htmlFor="name">
                Name
                <input 
                    id="name" 
                    name="name" 
                    className={`form-control ${error.key=='name' && error.status ? 'is-invalid' : ''}`} 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)} 
                />
                {error.status && error.key=='name' && <p style={{color:'red'}} className="is-invalid">{error.msj}</p>}
            </label>
            <label className="col" htmlFor="family">
                Family
                <input 
                    id="family" 
                    className={`form-control ${error.key=='family' && error.status ? 'is-invalid' : ''}`}
                    type="text" 
                    placeholder="Family" 
                    value={family} 
                    onChange={(e)=>setFamily(e.target.value)} 
                />
                {error.status && error.key=='family' && <p style={{color:'red'}} className="is-invalid">{error.msj}</p>}

            </label>

        </>
    )
}