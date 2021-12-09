import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from '../popup/Popup';
import Client from './Client';
import Pagination from '../pagination/Pagination';

export default function ClientsList (){
    const [clients , setClients] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [action, setAction] = useState();
    const [checkedList, setCheckedList] = useState([]);

    const [popupContent, setPopupContent] = useState({
        clients:[{}],
        targetClient:null
    });
    
    
    useEffect(()=> {
        setClients(JSON.parse(localStorage.getItem('clients')))
    },[])

    
    useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    },[clients])

    const clickAction = (action, data)=>{
        
        setAction(action);

        if(action === 'Add'){
            setShowPopup(true)
            setPopupContent(prev=>{
                return {
                    ...prev,
                        clients:clients, 
                        targetClient:{
                            id: clients.length !== 0 ? clients[clients.length-1].id+1 : 0,
                            name: '',
                            family: ''
                        }
                    
                    }
                }
            )
        }else if(action === 'Edit' || action === 'Delete'){
            setShowPopup(true)
            setPopupContent((prev)=>{
                return {...prev, targetClient:data}
            })
        }
    }

    const handleSubmit = (data) => {
        if (action === 'Add'){
            setClients(prev =>{
                return[...prev, data]
            });
        }
        else if(action === 'Edit'){
            setClients(clients.map((client) => client.id === data.id ? data : client ));
        }
        else if (action === 'Delete'){
            setClients(clients.filter(client => client.id !== data.id));
            setCheckedList(checkedList.filter(ids => ids !== data.id))
        }
    }
 
    const handleCheckedList = (id, isChecked) => {
        isChecked ? 
        setCheckedList(prev=> [...prev , id] ):
        setCheckedList(checkedList.filter(ids=> ids !== id))

        setClients(clients.map(client=>{
            if(client.id === id){
                client.selected = isChecked
            }
            return client
        }))
    }

    const selectAll = (e) =>{
        let status = e.target.checked 
        status ?
        currentClients.map(client=> {
            if(!checkedList.includes(client.id)){
                setCheckedList(prev=>[...prev, client.id])
            }
        }):
        
        setCheckedList([])
        
        setClients(clients.map(client=>{
            client.selected = status
            return client
        }))
    }

    const deleteSelected = () => {
        setClients(clients.filter(client=>!checkedList.includes(client.id)))
        // setClients(clients.map(client=>{
        //     client.selected = false
        //     return client
        // }))
        setCheckedList([])
    }  

    const [clientsPerPage, setClientsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    const totalPages = Math.ceil(clients.length/clientsPerPage);

    useEffect(() => {
        if(currentClients.length == 0 && currentPage != 1){
            setCurrentPage(prev=>prev-1)
        }
    }, [currentClients])


    return (
        <div className="container mt-5">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Clients</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-success" data-toggle="modal" onClick={() => clickAction('Add')}>
                            <i className="material-icons">&#xE147;</i> 
                            <span>Add New Client</span>
                        </button>
                        {checkedList.length !== 0 && <button onClick={deleteSelected} className="ml-2 btn-danger btn">Delete Selected</button>}
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <input checked={checkedList.length !== 0 && checkedList.length === currentClients.length} className="mx-auto" type="checkbox" onChange={selectAll}/>
                        </th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Family</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentClients.map((client)=>(
                            <Client 
                                clients={clients} 
                                data={client}
                                onCheckboxChange={handleCheckedList}
                                clickAction={clickAction}
                            />
                        ))
                    }
                </tbody>
            </table>
            
            <Pagination
                data = {clients}
                paginatedData={currentClients}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
            {checkedList.length !=0 &&<p>{checkedList.length} Selected</p>}
            <Popup 
                onSubmit={handleSubmit} 
                showPopup={showPopup} 
                action={action} 
                popupContent={popupContent} 
            />
        </div>
    )
}