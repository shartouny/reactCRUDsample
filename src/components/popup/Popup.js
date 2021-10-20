import { useEffect, useState } from "react";
import { Modal ,Button} from "react-bootstrap"
import ManageForm from "../forms/ManageForm"

export function Popup({popupContent, showPopup, action, onSubmit}){
   
    const [newClientData, setNewClientData] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({
        clients:[{}],
        targetClient:{},
    });
    const [method, setMethod] = useState('');

    useEffect(()=>{
        setIsVisible(showPopup);
        setData(popupContent);
        setMethod(action)
    }, [showPopup, popupContent, action]);


    const closePopup = () => {
        setIsVisible(false);
        setMethod('')
        setData({
            clients:[{}],
            targetClient:{},
        });
    }

    const handleSubmit = () => {
        let submitData = method === 'Delete' ? data.targetClient : newClientData;
        onSubmit(submitData)
        closePopup()
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
                {method === 'Delete' ? 
                    'Are you sure you want to delete ' + data.targetClient.name + ' ' + data.targetClient.family + '?' 
                    
                    : method === 'Delete Selected' ? 
                        'Are you sure you want to delete selected?! '
                    :
                    <ManageForm 
                        oldData ={data.targetClient} 
                        newData ={(data) => setNewClientData(data)} 
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
