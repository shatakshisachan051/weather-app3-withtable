import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CitiesTable from "./Components/CitiesTable";
import WeatherPage from "./Components/WeatherPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CitiesTable />} />
            <Route path="/weather/:cityName" element={<WeatherPage />} />
          </Routes>
        </BrowserRouter>
        {/* <CitiesTable /> */}
      </div>
    </>
  );
}

export default App;
