import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CitiesTable from "./Components/CitiesTable";
import WeatherPage from "./Components/WeatherPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter basename="/weather-app3-withtable">
          <Routes>
            <Route exact path="/weather-app3-withtable" element={<CitiesTable />} />
            <Route exact path="/weather/:cityName" element={<WeatherPage />} />
          </Routes>
        </BrowserRouter>
        {/* <CitiesTable /> */}
      </div>
    </>
  );
}

export default App;
