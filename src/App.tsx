
import {
  Route,
  Routes
} from "react-router-dom";
import {
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";
//import "./Styles/Style.css"
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import KiteSurf from "./components/KiteSurf";
import Footer from "./components/footer";
import Standuppaddle from"./components/standuppaddle2";
import Pricing from "./components/Pricing";
import Reservation from "./components/Reservation";
import Kayak from "./components/Kayak";
import InstructorProfile from "./components/profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => (
  <ChakraProvider >
    <ToastContainer />
    <Flex direction="column" minHeight="100vh">
 <NavBar></NavBar> 
 <Routes>
 <Route path="/" element={<Home/>}/>
      
      <Route path="Home" element={<Home/>}/>
      <Route path="KiteSurf" element={<KiteSurf></KiteSurf>}/>
      <Route path="Stand-up-paddle" element={<Standuppaddle></Standuppaddle>}/>
      <Route path="Pricing" element={<Pricing></Pricing>}/>
      <Route path="Reservation" element={<Reservation></Reservation>}/>
      <Route path="kayak" element={<Kayak></Kayak>}/>
      <Route path="/instructors/profile" element={<InstructorProfile></InstructorProfile>} />
  </Routes>
  <div className="footer">
      <Footer/>
    </div>
    </Flex>
  </ChakraProvider>
)
