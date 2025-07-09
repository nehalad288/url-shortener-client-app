import { useEffect, useState } from "react";
import { serverUrl } from "../helpers/constants";
import { User } from "./Form";

interface UserUrl {
  shortUrl: string;
  fullUrl: string;
  createdAt: string;
  clickCount: number;
}

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [userUrls, setUserUrls] = useState<UserUrl[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const response = await fetch(`${serverUrl}/shortUrl/user/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setUserUrls(data);
    };
    fetchUrls();
  }, []);

  return (
    <div className="overlay-container">
      <div className="user-urls">
        <h4>Popularity of the urls</h4>
        {userUrls.length === 0 ? (
          <p>No URLs yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="thStyle">Short URL</th>
                <th className="thStyle">Original URL</th>
                <th className="thStyle">Visited Count</th>
              </tr>
            </thead>
            <tbody>
              {userUrls.map((url, index) => (
                <tr key={index}>
                  <td className="tdStyle">
                    <a
                      href={`http://localhost:5001/api/shortUrl/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`http://short.ly/${url.shortUrl}`}
                    </a>
                  </td>
                  <td className="tdStyle">{url.fullUrl}</td>
                  <td className="tdStyle">{url.clickCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
