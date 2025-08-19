import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
// import { analyzeImage } from './api/mockFoodApi';
import { analyzeImage } from './api/clarifaiApi';
import { giDatabase } from './data/giDatabase';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './App.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);

  const handleImageUpload = (files) => {
    setIsLoading(true);
    Promise.all(files.map(analyzeImageFile)).then((results) => {
      setAnalysisResults((prevResults) => [...prevResults, ...results]);
      setIsLoading(false);
    });
  };

  const analyzeImageFile = async (file) => {
    const fileURL = URL.createObjectURL(file);
    try {
      const visionResult = await analyzeImage(file);
      console.log("vision result: ", visionResult)
      if (visionResult.recognized) {
        const foodData = giDatabase[visionResult.foodName];
        return foodData ? { ...visionResult, ...foodData, fileURL } : { ...visionResult, recognized: false, fileURL };
      } else {
        return { recognized: false, fileURL };
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      return { recognized: false, fileURL };
    }
  };

  const removeCard = (index) => {
    setAnalysisResults((prevResults) => prevResults.filter((_, i) => i !== index));
  };

  const chartData = {
    labels: analysisResults.map((result) => result.foodName || 'Unrecognized'),
    datasets: [
      {
        label: 'Glycemic Index',
        data: analysisResults.map((result) => result.gi || 0),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Confidence Level',
        data: analysisResults.map((result) => (result.confidence || 0) * 100),
        backgroundColor: '#FFCE56',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Glycemic Index and Confidence Level' },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Glycemic Index Analyzer</h1>

        <p>A feasibility prototype for diabetic self-management.</p>
        <ImageUploader onImageUpload={handleImageUpload} />
      </header>
      <main>
        <div className="chart-container">
          <h2>Glycemic Index and Confidence Level</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {isLoading && <div className="loader"></div>}

        <div className="results-container">
          {analysisResults.map((result, index) => (
            <ResultCard key={index} result={result} onRemove={() => removeCard(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;