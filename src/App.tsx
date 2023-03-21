import { Header } from './components/Header';
import { Timer } from './components/Timer';

export default function App() {
  return (
    <div className="App h-full w-full bg-primaryColor text-textColor">
      <Header />
      <Timer />
    </div>
  );
}
