import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import NavBar from "./pages/navbar/Navbar";
import About from "./pages/about/About";
import Model from "./pages/model/Model";
import Classification from "./pages/classification/Classification";
import Training from "./pages/classification/training/Training";
import Cleaning from "./pages/classification/cleaning/Cleaning";
import Testing from "./pages/classification/testing/Testing";
import Segmentation from "./pages/segmentation/Segmentation";
import CleaningSegmentation from "./pages/segmentation/cleaning/Cleaning";
import TrainingSegmentation from "./pages/segmentation/training/Training";
import TestingSegmentation from "./pages/segmentation/testing/Testing";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<NavBar />} path="/">
        <Route element={<About />} path="about" />
        <Route element={<Model />} path="model" />
        <Route element={<Segmentation />} path="segmentation">
          <Route element={<CleaningSegmentation />} path="cleaning" />
          <Route element={<TrainingSegmentation />} path="training" />
          <Route element={<TestingSegmentation />} path="testing" />
        </Route>
        <Route element={<Classification />} path="classification">
          <Route element={<Cleaning />} path="cleaning" />
          <Route element={<Training />} path="training" />
          <Route element={<Testing />} path="testing" />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
