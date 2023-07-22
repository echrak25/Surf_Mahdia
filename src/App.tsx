
import {
  Route,
  Routes
} from "react-router-dom";
import {
  ChakraProvider,
} from "@chakra-ui/react"
import "./Styles/Style.css"
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import KiteSurf from "./components/KiteSurf";
import Footer from "./components/footer";
import Standuppaddle from"./components/standuppaddle2";
import Pricing from "./components/Pricing";
import Reservation from "./components/Reservation";
export const App = () => (
  <ChakraProvider >
 <NavBar></NavBar> 
 <Routes>
 <Route path="/" element={<Home/>}/>
      <Route path="Stand-up-paddle" element={<Standuppaddle></Standuppaddle>}/>
      <Route path="Home" element={<Home/>}/>
      <Route path="KiteSurf" element={<KiteSurf></KiteSurf>}/>
      <Route path="Stand-up-paddle" element={<Standuppaddle></Standuppaddle>}/>
      <Route path="Pricing" element={<Pricing></Pricing>}/>
      <Route path="Reservation" element={<Reservation></Reservation>}/>
      
  </Routes>
  <Footer></Footer>
  </ChakraProvider>
)
