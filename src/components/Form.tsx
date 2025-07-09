import { useState } from "react";
import { serverUrl } from "../helpers/constants";

interface ShortenResponse {
  shortUrl: string;
}

interface UserUrl {
  shortUrl: string;
  fullUrl: string;
  createdAt: string;
  visitCount: number;
}
export interface User {
  _id: string;
  email: string;
  name: string;
}

interface FormProps {
  user: User;
}

export const Form: React.FC<FormProps> = ({ user }) => {
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  if (!user) {
    return (
      <div className="overlay-container">
        <h3 className="form-heading">Please log in to shorten URLs</h3>
      </div>
    );
  }
  
  const handleSubmit = async () => {
    try {
      const requestBody = {
        fullUrl: url,
        userId: user.email,
      };

      const response = await fetch(`${serverUrl}/shortUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data: ShortenResponse = await response.json();
      setUrl("");
      const short = `http://short.ly/${data.shortUrl}`;
      setSlug(data.shortUrl);
      setShortUrl(short);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = async () => {
    const copyValue = `http://localhost:5001/api/shortUrl/${slug}`;
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  return (
    <div className="overlay-container">
      <h3 className="form-heading">URL Shortener</h3>
      <div className="input-form">
        <p>Enter the URL to shorten</p>
        <div>URL</div>
        <input
          className="input-field"
          id="input-field"
          placeholder="Enter the url to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="shorten-button" onClick={handleSubmit}>
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div>
          <p className="success-message">Success! Here's your short URL:</p>
          <div className="result-container">
            <div className="result-url">{shortUrl}</div>
            <button 
              className="copy-button" 
              onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "blueviolet"; e.currentTarget.style.color="white"}}
              onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color="blueviolet"}}
              onClick={handleCopy}>
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
