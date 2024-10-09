import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import routes from '../Utils/routes';


export default function NotFoundPage() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        const getProductos = async () => {
            fetch('http://localhost:5050/api/Productos', {
                method: 'GET',
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    // Handle the fetched data here
                    setLista(data)
                })
                .catch((error) => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getProductos(); //llamada
    }, []); // dependencia variable de estado lista

    const fillStorage = () => {
        lista.map((list) => (
            fetch(`http://localhost:5050/api/Productos/${list._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    existencias: list.capacidadMax,
                    diferencia: 0
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))
        ))
    }

    return (
        <div className="main-common-container" style={{margin: '8px', marginLeft: '0'}}>
        <Container>
            <Row>
            <div className="fameBar-Container">
        <h1 style={{
            fontSize: 'var(--bs-nav-link-font-size)', 
            fontWeight: 'var(--bs-nav-link-font-weight)'
        }}>
            404: No existe la URL 
        </h1>
    </div>
            </Row>
            <Row className='mt-5'>
                <Col md={{ span: 6, offset: 3 }} className='text-center'>
                    
                    <h2>ERROR 404</h2>
                    <h3>Parece que te has perdido...</h3>
                    <Button as={NavLink} to={routes.home}>
                                Volver al inicio
                    </Button>
                    <button onClick={fillStorage}>Rellenar el almacen</button>
                </Col>
            </Row>
        </Container>
        </div>
    )
}