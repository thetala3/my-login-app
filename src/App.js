import LoginForm from "./components/LoginForm/LoginForm";
import ListTransaction from "./Pages/ListTransaction";
import Header from "./components/Header/index";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<WithHeader />}>
            <Route path="/home" element={<Home />} />
            <Route path="/list-transactions" element={<ListTransaction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function WithHeader() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/list-transactions" element={<ListTransaction />} />
      </Routes>
    </>
  );
}

export default App;
