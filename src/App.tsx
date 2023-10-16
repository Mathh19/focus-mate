import { Footer } from './components/Layout/Footer';
import { Header } from './components/Layout/Header';
import { Pomodoro } from './components/Pomodoro';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Pomodoro />
      <Footer />
    </div>
  );
}
