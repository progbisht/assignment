import { Route, Routes } from "react-router-dom";
import Base from "./Base";
import NewUser from "./NewUser";
import Users from "./Users";
import Layout from "./Layout";


function App() {

    

  return (
      <Routes>
        <Route path='/' element={<Layout/> }/>
          <Route index element={
            <Base 
              eventType="Add User"
            />
          } />
          <Route path='new' element={
            <NewUser />
          } />
          <Route path='/:id' element={<Users/> } />
          <Route path='/:id/p5' element={<Users/> } />
          <Route path='/:id/rewards' element={<Users/> } />
          <Route path='/:id/rewards/new' element={<Users/> } />
        

      </Routes>
      
    
  );
}

export default App;