import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation(); // permet de savoir sur quelle page on est actuellement
  
  const isActive = (path: string) => location.pathname === path; // fonction pour detecter si un lien est actif
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Gestion des Logs
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 text-blue-700'  // style si la page est active
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' // style par defaut avec hover
                }`}
              >
                Logs
              </Link>
              <Link
                to="/create"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/create') 
                    ? 'bg-blue-100 text-blue-700' // style si la page est active
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' // style par defaut avec hover
                }`}
              >
                Créer
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children} {/* contenu dynamique selon la page */}
      </main>
    </div>
  );
};