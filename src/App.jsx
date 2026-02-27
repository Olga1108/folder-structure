import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BROWSE_BASE } from './constants/routes';
import FileTree from './components/FileTree';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>File structure</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to={BROWSE_BASE} replace />} />
            <Route path="/browse" element={<FileTree />} />
            <Route path="/browse/*" element={<FileTree />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
