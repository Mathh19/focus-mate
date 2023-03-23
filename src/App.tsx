import { Header } from './components/Header';
import { Pomodoro } from './components/Pomodoro';

export default function App() {
  return (
    <div className="App h-screen w-screen bg-backgroundColor text-textColor">
      <Header />
      <Pomodoro />
    </div>
  );
}
