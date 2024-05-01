import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const username = inputText.trim();
    if (!username) {
      setError("Please enter a username");
      setLoading(false);
      return;
    }

    try {
      const url = `https://api.github.com/users/${username}`;
      const response = await fetch(url);
      if (!response.ok) {
        setError("User not found");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProfile(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <h2>Search Your Github Profile</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            <button className="primary-btn" type="submit">Search</button>
          </form>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
       
          {profile && (
            <div className="profile-container">
              <div className="profile-box">
                <div className="top-section">
                  <div className="left">
                    <div className="avatar">
                      <img src={profile.avatar_url} alt="User avatar" />
                    </div>
                    <div className="self">
                      {" "}
                      <h3>{profile.name}</h3>
                      <h3>@{profile.login}</h3>
                    </div>
                  </div>

                  <a
                    href={`https://github.com/${inputText}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="primary-btn">View Profile</button>
                  </a>
                </div>
                <div className="about">
                  <h3>About</h3>
                  <p>{profile.bio}</p>
                </div>
                <div className="status">
                  <div className="status-item">
                    <h4>Followers</h4>
                    <p> {profile.followers}</p>
                  </div>
                  <div className="status-item">
                    <h4>Following</h4>
                    <p>{profile.following}</p>
                  </div>
                  <div className="status-item">
                    <h4>Repository</h4>
                    <p>{profile.public_repos}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <h3 style={{marginTop:"12px"}}>Technologies Used</h3>
          <ul>
            <li>React</li>
            <li>Github API</li>
          </ul>
        </div>
     
    </>
  );
}

export default App;
