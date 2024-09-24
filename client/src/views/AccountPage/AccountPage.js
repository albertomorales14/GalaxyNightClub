import { Container, Row, Col, Card, Button, Stack} from 'react-bootstrap'
import useAuth from "../../auth/useAuth"
import DeleteModal from './components/DeleteModal';
import { useState } from 'react';

export default function AccountPage() {

    //hook
    const { user } = useAuth();

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const openDeleteModal = () => setIsOpenDeleteModal(true);
    const closeDeleteModal = () => setIsOpenDeleteModal(false);

    return (
        <>
        <Container>
            <Row className='mt-5'>
                <Stack gap={2}>
                    <div className='p-2'>
                        <Col XS={12} className='text-center'>
                            <img 
                            style={{
                                width: "200px", 
                                height: "200PX",
                                borderRadius: "50%",
                                objectFit: 'cover'
                            }}
                            src="/img/male_avatar.svg" 
                            alt="profile"/>
                        </Col>
                    </div>
                    <div className='p-2 text-center'>
                        <Col XS={12} className='mt-4 text-center'>
                            <Card style={{maxWidth: '360px'}} className='mx-auto'>
                                <p><b>Nombre: </b>{user.name}</p>
                                <p><b>Correo: </b>{user.email}</p>
                                <p><b>Rol: </b>{user.role}</p>

                                <Button>
                                    Editar cuenta
                                </Button>
                                <Button variant='link' className='mt-1'>
                                    Cambiar contraseña
                                </Button>
                                <Button variant='link' className='mt-3 text-danger'
                                    onClick={openDeleteModal}>
                                    Eliminar cuenta
                                </Button>
                            </Card>
                        </Col>
                    </div>
                </Stack>
            </Row>
        </Container>
        <DeleteModal isOpen={isOpenDeleteModal} close={closeDeleteModal}/>
        </>
    )
}