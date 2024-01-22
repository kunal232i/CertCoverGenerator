import React, { useState } from "react";
import axios, { AxiosError } from "axios";

interface ApiResponse {
  url: string;
}

const App: React.FC = () => {
  const openai_apikey = import.meta.env.VITE_OPENAI_API_KEY;
  const [certificateImage, setCertificateImage] = useState<string | null>(null);

  const generateCertificateCover = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: "Generate a certificate cover",
        },
        {
          headers: {
            Authorization: `Bearer ${openai_apikey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCertificateImage(response.data.url);
    } catch (error) {
      const typedError = error as AxiosError;
      if (typedError.response) {
        console.error(
          "Error generating `certificate cover:",
          typedError.response.data
        );
      } else {
        console.error(
          "Error generating certificate cover:",
          typedError.message
        );
      }
    }
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Certificate Cover Generator</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generateCertificateCover}
      >
        Generate Certificate Cover
      </button>
      {certificateImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Generated Certificate Cover:
          </h2>
          <img
            className="max-w-full"
            src={certificateImage}
            alt="Certificate Cover"
          />
        </div>
      )}
    </div>
  );
};
export default App;
