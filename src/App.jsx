import { useEffect, useState } from "react";
import "./App.css";
import UploadAndDisplayImage from "./components/UploadAndDisplayImage";

function App() {
  // retrieve environment variables
  const predictionKey =
    "DUk3Oxh01HBcEXoZFZLLBhIXhVwmMW9qY8DBVzDDmadhp55lMTNXJQQJ99BCACYeBjFXJ3w3AAAIACOGKq9v";
  const predictionEndpoint =
    "https://turnersinsurancerocognitionai-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b7b0f237-c697-43ac-a7c7-0e223a2a8d79/classify/iterations/Iteration4/image";

  // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState({});

  function uploadImage(event) {
    //console.log(event.target.files[0]); // Log the selected file
    setSelectedImage(event.target.files[0]); // Update the state with the selected file
  }

  useEffect(() => {
    makePrediction();
  }, [selectedImage]);

  async function makePrediction() {
    const rawData = await fetch(predictionEndpoint, {
      method: "POST",
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
      },
      body: selectedImage,
    });
    const result = await rawData.json();
    console.log(result);
    setPrediction(result);
  }

  return (
    <>
      <h1>Turner's Car Insurance</h1>
      <h2>AI Car Recognition</h2>
      <p>
        Upload a photo of your car so we can determine what the best policy for
        your car will be.
      </p>
      <UploadAndDisplayImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        uploadImage={uploadImage}
        makePrediction={makePrediction}
      />
      <div>
        {prediction
          ? prediction?.predictions?.map((prediction, index) => {
              return (
                <div key={index}>
                  <h3>{prediction.tagName}</h3>
                  <h3>Probability: {prediction.probability * 100}%</h3>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default App;
