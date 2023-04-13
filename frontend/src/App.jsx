import { Router } from './Router';
import { AppProvider } from './AppContext';

function App() {
  return <AppProvider>
    <Router />
  </AppProvider>;
}

export default App;