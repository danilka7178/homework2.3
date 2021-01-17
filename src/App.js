import React from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [users, setUsers] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [visibleButton, setvisibleButton] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${count}&limit=10`)
      .then(({ data }) => {
        setUsers((users) => ([...users, ...data]));
        if (data.length === 0) {
          setvisibleButton(false)
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [count]);

  return (
    <div className="app">
      <input type="text" placeholder="Поиск пользователя..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} />
      <ul className="users">
        {users ?
          users.filter((arg) => arg.name.toLocaleLowerCase().includes(inputValue.toLowerCase()) || arg.email.toLocaleLowerCase().includes(inputValue.toLowerCase()))
            .map((arg) => (<Card key={`${arg.id}_${arg.name.toString()}`} name={arg.name} email={arg.email} />))
          : <h3>Loading...</h3>}
      </ul>
      {isLoading && <h3>Loading...</h3>}
      {visibleButton && <button
        disabled={isLoading}
        onClick={() => setCount(count + 1)}>
        {isLoading ? "Wait..." : "Next 10 users"}</button>}
    </div >
  );
}

export default App;
