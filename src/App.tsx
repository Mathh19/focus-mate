import { Footer } from './components/Footer';
import { Header } from './components/Header';
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
