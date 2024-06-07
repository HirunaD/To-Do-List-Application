import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  const completeToDo = (id) => {
    axios
      .put(`${baseURL}/complete/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="main">
      <div className="sidebar">
        <div className="acmy"><h2>Acmy Solutions</h2></div>
        <div className="dashboard">Dashboard</div>
      </div>

      <div className="content">
        <div className="smain">
          <h1 className="title">Dashboard</h1>
          <div className="welcome">
            <h1>Welcome back, John Doe</h1>
            <p>The end of the year is coming. Are you planning your performance interviews? You can do this super efficiently with Acmy.</p>
            <a href="">Look here for more information</a>
          </div>
        </div>

        <div className="container">
          <div className="input_holder">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add a Task..."
            />
            <button onClick={saveToDo}>Add</button>
          </div>

          <div className="list">
            {toDos.map((el) => (
              <ToDo
                key={el._id}
                text={el.toDo}
                id={el._id}
                completed={el.completed}
                setUpdateUI={setUpdateUI}
                setShowPopup={setShowPopup}
                setPopupContent={setPopupContent}
                completeToDo={completeToDo}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="rightbar">
        <div className="notifications"><h2>Activity Feed</h2></div>
        <table className="activity-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-06-01</td>
              <td>Task Completed</td>
              <td>Done</td>
            </tr>
            <tr>
              <td>2024-06-02</td>
              <td>Task Added</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
