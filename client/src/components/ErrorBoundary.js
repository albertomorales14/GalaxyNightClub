import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Aquí puedes enviar el error a un servicio de monitoreo
        console.error("Error capturado:", error, errorInfo);
        // Puedes enviar los logs a Loggly o Sentry
        // logErrorToService(error, errorInfo);
    }

    render() {

        if (this.state.hasError) {
            return <h1>Algo salió mal.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;