import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.sass';
import Layout from './Layout';


function App() {
  return (
    <div 
    className='app'
    style={{ backgroundImage:`url(https://imrmedia.in/wp-content/uploads/2022/07/Hacker-are-the-backbone-of-cyber-armies.jpg)`,
    backgroundRepeat:"no-repeat",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    position:'absolute',
    width:'100%',
    height:'100%',
    overflow: 'scroll',
    }}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
