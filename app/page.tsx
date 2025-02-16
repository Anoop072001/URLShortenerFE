"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [LongUrl, setLongUrl] = useState<string>("");
  const [customNameUrl, setCustomUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_BASE_URL: string = "https://urlshortener-anoops.up.railway.app/api"; //put your backend url here or use mine if you are just testing Front end.

  const handleShorten = async (): Promise<void> => {
    if (!LongUrl) {
      setErrorMessage("Please enter a URL.");
      return;
    }
    setErrorMessage(null);
    setShortUrl(null);
    try {
      console.log("API requesting");
      const response = await axios.post<string>(`${API_BASE_URL}/shorten`,null, { params: { 
        LongUrl,
        customNameUrl: customNameUrl || undefined 
      }});
      if (typeof response.data === "string") {
        if (response.status === 200) {
          setShortUrl(response.data); // Success: set short URL
        } else {
          setErrorMessage(response.data); // Error: display text response
        }
      }
  
    } catch (error: unknown) {
      if(axios.isAxiosError(error))
      {
        if (error.response && typeof error.response.data === "string") {
          setErrorMessage(error.response.data);
        } else {
        setErrorMessage("Network error. Please try again.");
        }
    }
  }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter long URL"
          className="border p-2 rounded mb-4"
          value={LongUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Custom URL (optional)"
          className="border p-2 rounded mb-4"
          value={customNameUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleShorten}
        >
          Shorten URL
        </button>
        {shortUrl && (
          <div className="mt-4">
            <p className="text-gray-700">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
        {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
