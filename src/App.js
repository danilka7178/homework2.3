import React from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [data, setData] = React.useState("");
  const [count, setCount] = React.useState(1);


  React.useEffect(() => {
    axios.get(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${count}&limit=10`)
      .then(({ data }) => {
        setData(data);
      });
  }, [count]);


  return (
    <div className="app">
      <input type="text" placeholder="Поиск пользователя..." />
      <ul className="users">
        {data ? data.map((arg) => (<Card key={`${arg.id}_${arg.name.toString()}`} name={arg.name} email={arg.email} />)) : "Загрузка"}
      </ul>
      <button onClick={() => setCount(count + 1)}>Next 10 users</button>
    </div >
  );
}

export default App;
