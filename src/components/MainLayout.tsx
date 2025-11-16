import React, { useState } from 'react';
import { QuoteCalculator } from './QuoteCalculator';
import { MaterialManagement } from './MaterialManagement';

import { Settings } from './Settings';
import { SavedQuotes } from './SavedQuotes';
import { Quote } from '../types';
import { SoredIcon, CalculatorIcon, BoxIcon, CogIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon, SunIcon, MoonIcon } from './Icons';
import { useAuth } from './../context/AuthContext';
import { NavItem } from './NavItem';
import { useDarkMode } from '../hooks/useDarkMode';


type View = 'calculator' | 'materials' | 'settings' | 'quotes';

export const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('calculator');
  const [quoteToEdit, setQuoteToEdit] = useState<Quote | null>(null);
  const { logout } = useAuth();
  const { isDark, toggleDarkMode } = useDarkMode();

  // Diagnostic: log view changes during debugging
  React.useEffect(() => {
    console.log('[DEBUG] MainLayout currentView ->', currentView);
  }, [currentView]);

  const handleEditQuote = (quote: Quote) => {
    setQuoteToEdit(quote);
    setCurrentView('calculator');
  };

  const renderView = () => {
    switch (currentView) {
      case 'calculator':
        return <QuoteCalculator data-testid="quote-calculator" quoteToEdit={quoteToEdit} setQuoteToEdit={setQuoteToEdit} onNavigateToMaterials={() => setCurrentView('materials')} />;
      case 'materials':
        return <MaterialManagement activeView={currentView} />;
      case 'settings':
        return <Settings />;
      case 'quotes':
        return <SavedQuotes onEditQuote={handleEditQuote} />;
      default:
        return <QuoteCalculator quoteToEdit={quoteToEdit} setQuoteToEdit={setQuoteToEdit} onNavigateToMaterials={() => setCurrentView('materials')} />;
    }
  };
  


  return (
      <div className="flex flex-col md:flex-row min-h-screen bg-background dark:bg-slate-900 transition-all duration-300 ease-in-out">
        <aside className="w-full md:w-56 bg-surface dark:bg-slate-800 shadow-lg hover:shadow-xl fixed bottom-0 md:relative md:min-h-screen z-20 flex flex-col transition-all duration-300 ease-in-out backdrop-blur-sm">
          <div className="px-4 py-6 flex-grow">
            <div className="flex items-center justify-between md:justify-center text-primary mb-8 group">
              <div className="flex items-center hover:scale-105 transition-all duration-300 ease-in-out">
                <SoredIcon className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300 ease-in-out"/>
                <h1 className="ml-2 text-xl font-bold text-textPrimary dark:text-slate-100 hidden md:block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-primary transition-all duration-300">SORED</h1>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 md:hidden group shadow-lg hover:shadow-xl"
                aria-label="Toggle dark mode"
              >
                {isDark ? 
                  <SunIcon className="w-5 h-5 text-slate-300 group-hover:text-yellow-400 transition-all duration-300 group-hover:rotate-180" /> : 
                  <MoonIcon className="w-5 h-5 text-textSecondary group-hover:text-blue-400 transition-all duration-300 group-hover:-rotate-12" />
                }
              </button>
            </div>
            <nav className="flex flex-row md:flex-col justify-around md:space-y-2">
              <NavItem view="calculator" label="Novo Orçamento" icon={<CalculatorIcon className="w-5 h-5" />} currentView={currentView} setCurrentView={setCurrentView} setQuoteToEdit={setQuoteToEdit} />
              <NavItem view="quotes" label="Orçamentos" icon={<DocumentTextIcon className="w-5 h-5" />} currentView={currentView} setCurrentView={setCurrentView} setQuoteToEdit={setQuoteToEdit} />
              <NavItem view="materials" label="Materiais" icon={<BoxIcon className="w-5 h-5" />} currentView={currentView} setCurrentView={setCurrentView} setQuoteToEdit={setQuoteToEdit} />
              <NavItem view="settings" label="Configurações" icon={<CogIcon className="w-5 h-5" />} currentView={currentView} setCurrentView={setCurrentView} setQuoteToEdit={setQuoteToEdit} />
            </nav>
          </div>
          <div className="p-4 hidden md:block space-y-2">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out text-textSecondary dark:text-slate-300 group hover:scale-105 active:scale-95 hover:shadow-lg"
              aria-label="Toggle dark mode"
            >
              {isDark ? 
                <SunIcon className="w-5 h-5 group-hover:text-yellow-400 transition-all duration-300 group-hover:rotate-180" /> : 
                <MoonIcon className="w-5 h-5 group-hover:text-blue-400 transition-all duration-300 group-hover:-rotate-12" />
              }
              <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
            <NavItem label="Sair" icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />} onClick={logout} currentView={currentView} setCurrentView={setCurrentView} setQuoteToEdit={setQuoteToEdit} />
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 transition-all duration-500 ease-in-out transform" data-testid="main-view-container">
          <div className="animate-fade-in-up">
            {renderView()}
          </div>
        </main>
      </div>
  );
};