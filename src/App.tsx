
import {
  Route,
  Routes
} from "react-router-dom";
import {
  ChakraProvider,
} from "@chakra-ui/react"
//import "../Styles/Style.css"
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import KiteSurf from "./components/KiteSurf";
import Footer from "./components/footer";
import Standuppaddle from"./components/standuppaddle";
export const App = () => (
  <ChakraProvider >
 <NavBar></NavBar> 

 <Routes>

 <Route path="/" element={<Home/>}/>
<<<<<<< HEAD
      <Route path="Jewlery" element={<Home/>}/>
      <Route path="Stand-up-paddle" element={<Standuppaddle></Standuppaddle>}/>



=======
      <Route path="Home" element={<Home/>}/>
      <Route path="KiteSurf" element={<KiteSurf></KiteSurf>}/>
>>>>>>> bcfe7db78562849e939ed3c2a31c193e3a7e48a5
  </Routes>
  <Footer></Footer>
  </ChakraProvider>
)
