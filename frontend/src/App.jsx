import React, { useState } from "react";
import axios from "axios";
export default function App() {
  let [user, setUser] = useState([]);

  axios.get("/api").then((res) => {
    setUser(res.data);
  });
  return (
    <div>
      <h1>Hello World!</h1>
      {user.map((user) => (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <p className="card-text">
              {user.firstname } {user.lastname}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
