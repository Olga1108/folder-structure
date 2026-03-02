import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BROWSE_BASE } from './constants/routes';
import FileTree from './components/FileTree';
import NotFound from './components/NotFound';
import './App.css';

export function AppRoutes() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>File structure</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={BROWSE_BASE} replace />} />
          <Route path="/browse/*" element={<FileTree />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
