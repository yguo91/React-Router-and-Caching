import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { Link } from "react-router";

function App() {
  return (
    <>
      <Link to="/about">About</Link>
      <Header />
      <Assignments />
    </>
  );
}

export default App;
