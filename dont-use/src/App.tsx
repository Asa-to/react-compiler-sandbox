import { SetStateAction, useState } from "react";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div style={{ padding: "12px" }}>
      <Title title="何もしない" />
      <TodoAdd setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

const Title = (props: { title: string }) => {
  const { title } = props;

  return <h1>{title}</h1>;
};

const TodoAdd = (props: {
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}) => {
  const { setTodos } = props;
  const [text, setText] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (text === "") return;
    setTodos((todos) => [...todos, { id: todos.length, text }]);
    setText("");
  };

  return (
    <form>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick} type="submit">
        追加
      </button>
    </form>
  );
};
const TodoList = (props: {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
}) => {
  const { todos, setTodos } = props;
  const getHandleClick = (id: number) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(({ id, text }) => (
        <li key={id}>
          {text}
          <button onClick={getHandleClick(id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
