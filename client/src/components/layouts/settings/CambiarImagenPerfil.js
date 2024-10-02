import { useState } from 'react';
import { Button, Modal, Alert, Form } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import logService from '../../../Utils/logService';

export default function CambiarImagenPerfil({ isOpen, close }) {

    const IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
    const IMAGE_EXT_REGEX = /.(jpe?g|png)$/i; // JPG / JPEG / PNG
    const [fileName, setFileName] = useState('Subir una imagen');
    const [selectedFile, setSelectedFile] = useState(null);
    const { updateUser } = useAuth();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!(file.size < IMAGE_SIZE)) {
            // imagen no valida
            alert('pesa mucho')
        } else {
            if (!(IMAGE_EXT_REGEX.test(file.name))) {
                // no es .jpg/.jpeg/.png
                alert('no es imagen')
            } else {
                setFileName(file.name);


                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedFile(reader.result);
                }
                reader.readAsDataURL(file);
            }
        }



    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            logService.sendLog('error', 'No hay archivos');
            return;
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('image', selectedFile); // Agregamos el archivo al FormData

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]); // Esto debería mostrar el archivo
        }

        logService.sendLog('info', 'formData creado: handleConfirm (CambiarImagenPerfil.js)');
        logService.sendLog('info', formData);
        try {
            const response = await fetch('http://localhost:5050/api/upload', {
                method: 'POST',
                body: formData, // Enviar el FormData con la imagen
            });

            

            if (!response.ok) {
                logService.sendLog('error', 'Network response was not ok');
                throw new Error('Network response was not ok');
            }

            // Si la respuesta es exitosa
           
            const data = await response.json();

            // Actualizar imagen del usuario
            ///////////updateUser({ imagen: '/img/' + fileName });
        
            logService.sendLog('info', 'Imagen subida correctamente\n: ' + data);
            console.log('Imagen subida correctamente:', data);
            
        } catch (error) {
            logService.sendLog('error', 'Error al subir la imagen: ' + error);
            console.error('Error al subir la imagen', error);
        }

        close();
    }

    return (
        <Modal show={isOpen} onHide={() => { close(); setFileName('Subir una imagen'); setSelectedFile(null) }} animation={false}>
            <Modal.Header style={{ display: 'flex !important' }}>
                <Modal.Title>
                    <img id="img-header" className="header-img" src="/img/profile-img-1.png" alt="user-photo" />
                    &nbsp; Imagen de perfil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    <Form onSubmit={handleConfirm}>
                        <Form.Group controlId="changeImgFormFile" className="mb-3" variant='dark'>
                            <Form.Control type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}  // Ocultamos el input file
                                data-browse='Subir'
                                accept='.png, .jpg, .jpeg' />
                        </Form.Group>
                        <Button id="subir-imagen" type="submit" style={{ display: 'none' }} >
                            Subir
                        </Button>
                    </Form>
                    <div className='input-file-img-custom'>
                        <Button onClick={() => document.getElementById('changeImgFormFile').click()}>
                            Seleccionar archivo
                        </Button>
                        <span className="custom-file-name">
                            {selectedFile ? fileName : 'Ningún archivo seleccionado'}
                        </span>
                    </div>
                    <div className={!selectedFile ? '' : 'img-preview'}>
                        <img className='img-fluid' style={{ height: '30vh !important' }} src={selectedFile} alt={!selectedFile ? '' : 'pre-view-img'} />
                    </div>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { /*close(); setFileName('Subir una imagen'); setSelectedFile(null)*/ }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button disabled={!selectedFile} onClick={() => { document.getElementById('subir-imagen').click() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}