
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
export const App = () => (
  <ChakraProvider >
 <NavBar></NavBar> 

 <Routes>

 <Route path="/" element={<Home/>}/>
      <Route path="Home" element={<Home/>}/>
      <Route path="KiteSurf" element={<KiteSurf></KiteSurf>}/>
  </Routes>
  <Footer></Footer>
  </ChakraProvider>
)
