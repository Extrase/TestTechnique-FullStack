import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateLogPage from './pages/CreateLogPage';
import { Layout } from './pages/components/Layout';
import { LogProvider } from './contexts/LogContext';

// App.tsx ne gère que le routing et la fourniture du contexte
function App() {
  return (
    <BrowserRouter> {/* permet de gerer les URLs dans l'application */}
      <LogProvider> {/* fournit le contexte des logs a toute l'application */}
        <Layout> {/* layout commun avec header et navigation */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* page d'accueil avec la liste des logs */}
            <Route path="/create" element={<CreateLogPage />} /> {/* page de creation de logs */}
          </Routes>
        </Layout>
      </LogProvider>
    </BrowserRouter>
  );
}

export default App;