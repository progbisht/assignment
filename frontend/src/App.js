import { Route, Routes } from "react-router-dom";
import Base from "./Base";
import NewUser from "./NewUser";
import Users from "./Users";
import Layout from "./Layout";
import P5History from "./P5History";
import RewardHistory from "./RewardHistory"
import NewReward from "./NewReward";

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
          <Route path='/:id/p5' element={<P5History/> } />
          <Route path='/:id/rewards' element={<RewardHistory/> } />
          <Route path='/:id/rewards/new' element={<NewReward/> } />
        

      </Routes>
      
    
  );
}

export default App;
