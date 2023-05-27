import Form from './Form'
import { AppProvider } from "./contexts/app.provider"

function App() {
  return (
    <AppProvider>
      <div className='md:min-h-screen flex flex-col items-center justify-center justify-items-center max-w-xl m-auto'>
        <img src="https://www.noema.net/wp-content/uploads/2019/09/noema-logo-black-800.png" width={270}  alt="Noema"></img>
        <Form/>
      </div>
    </AppProvider>
  );
}

export default App;
