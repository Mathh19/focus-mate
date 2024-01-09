import { Outlet } from 'react-router-dom';
import { Footer } from './components/Layout/Footer';
import { Header } from './components/Layout/Header';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
