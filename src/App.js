import "./App.css";
import {useEffect} from 'react';
import Segment from './component/Segment';
import Header from './component/Header';
function App() {

return (
     <>
     <div className="App" id="main">
      {/* <!-- Header ----> */}
      <Header headerText='View Audience'></Header>
     </div>
     <Segment></Segment>
    
     </>
  );
}

export default App;
