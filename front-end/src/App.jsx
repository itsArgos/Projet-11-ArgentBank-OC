import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import { fetchProfile } from "./redux/actions/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  dispatch(fetchProfile());
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
