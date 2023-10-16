import { Footer } from './components/Layout/Footer';
import { Header } from './components/Layout/Header';
import { Pomodoro } from './components/Pomodoro';
import { MessageAlert } from './components/UI/MessageAlert';

export default function App() {
  return (
    <div className="App">
      <MessageAlert />
      <Header />
      <Pomodoro />
      <Footer />
    </div>
  );
}
