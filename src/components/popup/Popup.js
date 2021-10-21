import { useEffect, useState } from "react";
import { Modal ,Button} from "react-bootstrap"
import ManageForm from "../forms/ManageForm"

export default function Popup({popupContent, showPopup, action, onSubmit}){
   
    const [newClientData, setNewClientData] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({
        clients:[{}],
        targetClient:{},
    });
    const [error , setError] = useState({
        status : false,
        key : '',
        msj : ''
    })

    const [method, setMethod] = useState('');

    useEffect(()=>{
        setIsVisible(showPopup);
        setData(popupContent);
        setMethod(action)
    }, [showPopup, popupContent, action]);


    const closePopup = () => {
        setIsVisible(false);
        setMethod('')
        setData(prev=>{
            return{
                ...prev,
                targetClient:{}
            }
        });
        setError({
            status : false,
            key : '',
            msj : ''
        })
    }

    const handleSubmit = () => {
        let submitData = method === 'Delete' ? data.targetClient : newClientData;
        if(method != 'Delete'){
            if(validate(submitData)){
                onSubmit(submitData)
                closePopup()
            }
        }else{
            onSubmit(submitData)
            closePopup()
        }
        
    }

    const validate = (d) =>{

        if(d.name == ''){
            setError(prev=>{
                return {...prev, status:true, key:'name', msj:'Name cant be empty'};
            })
            console.log(error.msj);
            return false
        }
        if(d.family == ''){
            setError(prev=>{
                return {...prev, status:true, key:'family', msj:'Family cant be empty'};
            })
            console.log(error.msj);

            return false;
        }
        if(data.clients.find(client=>client.name == d.name && client.id != d.id) != null){
            setError(prev=>{
                return {...prev, status:true, key:'name', msj:'Client already exist'};
            })
            console.log(error.msj);

            return false;
        }
        return true
    }

    return  (
        <Modal show={isVisible} onHide={closePopup}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className={method === 'Delete' || method ==='Delete Selected' ? "text-danger" : "text-info"}>
                        { method === 'Delete' ? 'Warning !!!' : method + ' Client' }
                    </h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    method === 'Delete' ? 
                        'Are you sure you want to delete ' + data.targetClient.name + ' ' + data.targetClient.family + '?' : 
                    method === 'Delete Selected' ? 
                        'Are you sure you want to delete selected?! ' :
                    <ManageForm 
                        oldData ={data.targetClient} 
                        newData ={(data) => setNewClientData(data)} 
                        error = {error}
                    />
                }
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant={method === 'Delete' || method ==='Delete Selected'? 'danger' : 'success'} onClick={handleSubmit}>
                    {method === 'Delete' || method ==='Delete Selected' ? 'Proceed' : 'Save'}
                </Button>
                <Button variant="secondary" onClick={closePopup}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
