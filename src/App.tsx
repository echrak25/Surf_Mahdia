
import {
  Route,
  Routes
} from "react-router-dom";
import {
  ChakraProvider,
} from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/footer";
import Standuppaddle from"./components/standuppaddle";
export const App = () => (
  <ChakraProvider >
 <NavBar></NavBar> 

 <Routes>

 <Route path="/" element={<Home/>}/>
      <Route path="Jewlery" element={<Home/>}/>
      <Route path="Stand-up-paddle" element={<Standuppaddle></Standuppaddle>}/>



  </Routes>

  <Footer></Footer>
  </ChakraProvider>
)
