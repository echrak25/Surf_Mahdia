
import {
  Route,
  Routes
} from "react-router-dom";
import {
  ChakraProvider,
} from "@chakra-ui/react"
import NavBar from "./components/NavBar"


import Home from "./components/Home";

export const App = () => (
  
  <ChakraProvider >
 <NavBar></NavBar> 

 <Routes>

 <Route path="/" element={<Home/>}/>
      <Route path="Jewlery" element={<Home/>}/>

  </Routes>

    
  </ChakraProvider>
)
