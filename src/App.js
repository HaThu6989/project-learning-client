import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import TopicListPage from "./pages/TopicListPage";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTopicPage from "./pages/AddTopicPage";
import EditTopicPage from "./pages/EditTopicPage";
import IsPrivate from "./components/isPrivate";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import Navbar from "./components/Navbar";

function App() {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/topics`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("topics in request", response.data);
        setTopics(response.data);
      })
      .catch((e) =>
        console.log("error getting topics from API...", e.response.status)
      );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/topics"
          element={
            <IsPrivate>
              <TopicListPage
                topics={topics}
                callbackUpdateTopicList={fetchTopics}
              />
            </IsPrivate>
          }
        />
        <Route
          path="/topics/create"
          element={
            <IsPrivate>
              <AddTopicPage callbackUpdateTopicList={fetchTopics} />
            </IsPrivate>
          }
        />

        <Route
          path="/topics/:topicId/edit"
          element={
            <IsPrivate>
              <EditTopicPage
                topics={topics}
                callbackUpdateTopicList={fetchTopics}
              />
            </IsPrivate>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
