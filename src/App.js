import LoginForm from "./components/LoginForm/LoginForm";
import ListTransaction from "./Pages/ListTransaction";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/ListTransaction" element={<ListTransaction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
