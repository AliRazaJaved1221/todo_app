import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import SideBar from './Components/SideBar';
// import Nawi from './Components/Nawi';
import { Provider } from 'react-redux';
import { store } from './redux/Store/store';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');  // State to manage search query

  return (
  <>
<Provider store={store}>
<div><Header/></div>
<div className='flex mt-6'>
  <div className="w-1/4"><SideBar setSearchQuery={setSearchQuery}/></div>
  <div className="w-3/4"><Main searchQuery={searchQuery}/></div>
</div>  
</Provider>

{/* <Main/> */}

  </>
  );
}

export default App;
