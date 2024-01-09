import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Layout/Header';
import { Footer } from '../../components/Layout/Footer';

export const Layout = () => {
  return (
    <main className="App">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
