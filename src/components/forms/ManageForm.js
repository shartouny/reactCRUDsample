import {useEffect, useState } from "react"

export default function ManageForm({oldData , newData}){
    
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
                    className="form-control" 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)} 
                />
            </label>
            <label className="col" htmlFor="family">
                Family
                <input 
                    id="family" 
                    className="form-control" 
                    type="text" 
                    placeholder="Family" 
                    value={family} 
                    onChange={(e)=>setFamily(e.target.value)} 
                />
            </label>

        </>
    )
}