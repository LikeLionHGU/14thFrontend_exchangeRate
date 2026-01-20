import { BrowserRouter, Routes, Route } from "react-router-dom";
//import List from "./components/0115/List";
//import Create from "./components/0115/Create";
//import Update from "./components/0115/Update";
import Loading from "./components/0116/loading";
import TestPage from "./components/0116/TestPage";
import Main from "./Main";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Main />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
