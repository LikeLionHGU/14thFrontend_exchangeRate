import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/loading";
import Main from "./Main";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Main />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;