import { useState, useEffect } from 'react';
import { Button, Modal, Alert, Form } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import logService from '../../../Utils/logService';

function CambiarImagenPerfil({ isOpen, close }) {

    const { user, updateUser } = useAuth();

    const IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
    const IMAGE_EXT_REGEX = /.(jpe?g|png)$/i; // JPG / JPEG / PNG
    const [fileName, setFileName] = useState('Subir una imagen');
    const [selectedFile, setSelectedFile] = useState(null); // cadena base64 para preview
    const [originalFile, setOriginalFile] = useState(''); // archivo original

    // Control de errores y alert msg error
    const [error, setError] = useState(null);
    const [closeAlert, setCloseAlert] = useState(true);
    const openAlert = () => setCloseAlert(false);
    const closeErrorAlert = () => {
        setCloseAlert(true);
        setError(null);
    }

    // Carga el error cada vez que lo detecte
    useEffect(() => {
        if (error !== null) {
            openAlert();
        }
    }, [error]); // dependencia de error

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!(file.size < IMAGE_SIZE)) {
                // imagen no valida
                setError('La imagen es demasiado pesada, tamaño máximo: 50MB');
            } else {
                if (!(IMAGE_EXT_REGEX.test(file.name))) {
                    // no es .jpg/.jpeg/.png
                    setError('El tipo de imagen no es válido, o el archivo no es una imagen');
                } else {
                    setFileName(file.name);
                    setOriginalFile(file);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setSelectedFile(reader.result);
                    }
                    reader.readAsDataURL(file);
                }
            }
        }

    }

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!originalFile) {
            logService.sendLog('error', 'function handleConfirm (CambiarImagenPerfil.js) No hay archivos incluidos');
            return;
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('image', originalFile); // Agregamos el archivo al FormData

        logService.sendLog('info', 'function handleConfirm (CambiarImagenPerfil.js) formData creado');
        logService.sendLog('info', formData.get('image'));

        try {
            const response = await fetch('http://localhost:5050/api/upload', {
                method: 'POST',
                body: formData, // Enviar el FormData con la imagen
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Si la respuesta es exitosa
            const data = await response.json();

            // Actualizar imagen del usuario desde el AuthProvider
            updateUser({ imagen: fileName });

            logService.sendLog('info', 'function handleConfirm (CambiarImagenPerfil.js) Imagen subida correctamente\n: ' + data);
            console.log('function handleConfirm (CambiarImagenPerfil.js) Imagen subida correctamente:', data);

        } catch (error) {
            logService.sendLog('error', 'ERROR en function handleConfirm (CambiarImagenPerfil.js): ' + error);
            console.error(error);
        }

        // Limpiar componente
        cleanComponent();
    }

    const cleanComponent = () => {
        setSelectedFile(null);
        setOriginalFile('');
        setFileName('Subir una imagen');
        closeErrorAlert();
        close();
    }

    return (
        <Modal show={isOpen} onHide={() => { cleanComponent(); document.getElementById('img-header').click() }} animation={false}>
            <Modal.Header className='modal-header-img-page change-img-header'>
                <Modal.Title>
                    <img id="img-header" className="header-img" src={`http://localhost:5050/uploads/img/${user.imagen}`} style={{ cursor: 'default' }} alt="user-photo" />
                    &nbsp;<span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-alert" style={{ display: 'flex' }} hidden={closeAlert}>
                    <div style={{ textAlign: 'left', flex: '8' }}>{error}</div>
                    <button className="login-alert-closebtn" onClick={closeErrorAlert}>&times;</button>
                </div>
                <Alert className='custom-alert'>
                    <h2 style={{ textAlign: 'left' }}>Cambiar imagen de perfil</h2>
                    <Form onSubmit={handleConfirm}>
                        <Form.Group controlId="changeImgFormFile" className="mb-3" variant='dark'>
                            <Form.Control 
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}  // Ocultamos el input file
                                accept='image/*'
                            />
                        </Form.Group>
                        <Button id="subir-imagen" type="submit" style={{ display: 'none' }} >
                            Subir
                        </Button>
                    </Form>
                    <div className='input-file-img-custom' style={{ display: 'grid' }}>
                        <span className="custom-file-name">
                            {selectedFile ?
                                'Imagen seleccionada: ' + fileName : 'Ningún archivo seleccionado'}
                        </span>
                        <Button onClick={() => document.getElementById('changeImgFormFile').click()} style={{ marginLeft: '0 !important' }}>
                            {selectedFile ? 'Seleccionar otro archivo' : 'Seleccionar archivo'}
                        </Button>
                    </div>
                    <div className={!selectedFile ? '' : 'img-preview'}>
                        <img className='img-fluid' style={{ height: '30vh !important', objectFit: 'cover', width: '30vh' }} src={selectedFile} alt={!selectedFile ? '' : 'pre-view-img'} />
                    </div>
                </Alert>
            </Modal.Body>
            <Modal.Footer className='change-img-footer'>
                <Button onClick={cleanComponent} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button disabled={!selectedFile} onClick={() => { document.getElementById('subir-imagen').click() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CambiarImagenPerfil;