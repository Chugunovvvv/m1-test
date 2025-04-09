import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import SinglePage from "./pages/SinglePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/:id" element={<SinglePage />} />
    </Routes>
  );
};

export default App;
