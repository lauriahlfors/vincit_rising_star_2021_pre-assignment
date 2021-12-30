import { StoreProvider } from './store/store';
import Analytics from './views/Analytics';

function App() {
  return (
    <div className='app'>
      <StoreProvider>
        {/* <Navbar /> */}
        <Analytics />
      </StoreProvider>
    </div>
  );
}

export default App;
