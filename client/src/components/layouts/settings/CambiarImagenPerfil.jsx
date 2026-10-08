import { useState } from 'react';
import { Button, Modal, Alert, Form } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import logService from '../../../Utils/logService';
import { DEFAULT_PROFILE_IMAGE } from '../../../Utils/profileImage';

const IMAGE_SIZE = 5 * 1024 * 1024; // 5MB, el mismo límite que el servidor
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function CambiarImagenPerfil({ isOpen, close }) {

    const { user, updateAvatar } = useAuth();

    const [fileName, setFileName] = useState('Subir una imagen');
    const [selectedFile, setSelectedFile] = useState(null); // cadena base64 para preview
    const [originalFile, setOriginalFile] = useState(null); // archivo original
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > IMAGE_SIZE) {
            setError('La imagen es demasiado pesada, tamaño máximo: 5MB');
        } else if (!IMAGE_TYPES.includes(file.type)) {
            setError('El archivo no es una imagen válida (JPG, PNG, WEBP o GIF)');
        } else {
            setError(null);
            setFileName(file.name);
            setOriginalFile(file);

            const reader = new FileReader();
            reader.onloadend = () => setSelectedFile(reader.result);
            reader.readAsDataURL(file);
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (!originalFile) return;

        setUploading(true);
        try {
            await updateAvatar(originalFile);
            logService.sendLog('info', 'Imagen de perfil actualizada (CambiarImagenPerfil)');
            cleanComponent();
        } catch (err) {
            logService.sendLog('error', 'Error al subir la imagen de perfil (CambiarImagenPerfil): ' + err.message);
            setError(err.message);
        } finally {
            setUploading(false);
        }
    }

    const cleanComponent = () => {
        setSelectedFile(null);
        setOriginalFile(null);
        setFileName('Subir una imagen');
        setError(null);
        close();
    }

    return (
        <Modal show={isOpen} onHide={cleanComponent} animation={false}>
            <Modal.Header className='modal-header-img-page change-img-header'>
                <Modal.Title>
                    <img className="header-img" src={user.imagenUrl || DEFAULT_PROFILE_IMAGE} style={{ cursor: 'default' }} alt="Imagen de perfil" />
                    &nbsp;<span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && (
                    <div className="login-alert" style={{ display: 'flex' }}>
                        <div style={{ textAlign: 'left', flex: '8' }}>{error}</div>
                        <button className="login-alert-closebtn" onClick={() => setError(null)}>&times;</button>
                    </div>
                )}
                <Alert className='custom-alert'>
                    <h2 style={{ textAlign: 'left' }}>Cambiar imagen de perfil</h2>
                    <Form id="change-img-form" onSubmit={handleConfirm}>
                        <Form.Group controlId="changeImgFormFile" className="mb-3">
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}  // Ocultamos el input file
                                accept={IMAGE_TYPES.join(',')}
                            />
                        </Form.Group>
                    </Form>
                    <div className='input-file-img-custom' style={{ display: 'grid' }}>
                        <span className="custom-file-name">
                            {selectedFile ? 'Imagen seleccionada: ' + fileName : 'Ningún archivo seleccionado'}
                        </span>
                        <Button as="label" htmlFor="changeImgFormFile" style={{ marginLeft: '0 !important' }}>
                            {selectedFile ? 'Seleccionar otro archivo' : 'Seleccionar archivo'}
                        </Button>
                    </div>
                    {selectedFile && (
                        <div className='img-preview'>
                            <img className='img-fluid' style={{ height: '30vh', objectFit: 'cover', width: '30vh' }} src={selectedFile} alt='Vista previa' />
                        </div>
                    )}
                </Alert>
            </Modal.Body>
            <Modal.Footer className='change-img-footer'>
                <Button onClick={cleanComponent} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button type="submit" form="change-img-form" disabled={!selectedFile || uploading} style={{ width: '50%', textAlign: 'center' }}>
                    {uploading ? 'Subiendo...' : 'Confirmar'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CambiarImagenPerfil;
