
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import { useHistory } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {UpdateDocument} from '../firebase.js';
import { deleteField, getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

const ConfirmCancelSeatTransferPage = () => {
    
    const history = useHistory();

    const auth = getAuth();

    console.log(history.location);
    UpdateDocument(history.location.building, "Requesters", {
        [`${history.location.data.userData.uid}.responder`]: auth.currentUser.uid
    });
    const handleConfirm = () => {
        UpdateDocument(history.location.building, "Requesters", {
            [`${history.location.data.userData.uid}.state`]: true
        });
        
        UpdateDocument("Users", auth.currentUser.uid, {
            TokenCount: increment(-1)
        });   

        history.push("/home")
        //add token transfer and delete match done from database 
    }

    const handleAFK = () => {
        UpdateDocument(history.location.building, "Requesters", {
            [`${history.location.data.userData.uid}.state`]: false
        });
        history.push("/home")
        //delete match done from database 
    }


    return (
        <div>

            <div className="w-responsive text-center mx-auto p-5 mt-5" className="padding">
    
            <Card>
            <Card.Header as="h5">
                <Container  fluid="md">
                    <Row >
                        <Col><img src={getAuth().currentUser.photoURL}
                                  className='img-fluid rounded-circle'
                                  alt="new"/>                           
                        </Col>
                        <Col>
                            <h1 style={{marginTop:20}}>You got a seat!</h1>
                        </Col>
                        <Col>
                         
                        <img src={history.location.data.userData.avatar} className='img-fluid rounded-circle'
                                  alt="new"/>   
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
            <Stack gap={1} className="col-md-5 mx-auto">
            <br/><br/><br/><br/><br/>
                <Card.Title><h1>{history.location.data.responderMessage}</h1></Card.Title>
                <br/><br/><br/><br/><br/>
                <Card.Body><Button variant="success"size="lg" onClick={handleConfirm}>Confirm</Button><Button variant="danger"size="lg" onClick={handleAFK}>Where is this guy?</Button></Card.Body>
            </Stack>
            </Card.Body>
            </Card>
            </div>
        </div>
        )
}

export default ConfirmCancelSeatTransferPage