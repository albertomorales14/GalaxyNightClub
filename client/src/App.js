import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import AuthProvider from './auth/AuthProvider';
import Layout from './components/layouts/Layout';

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Layout>
                        <AppRouter />
                    </Layout>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
