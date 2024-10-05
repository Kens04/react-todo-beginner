import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [todoId, setTodoId] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("notstarted");

  const handleNewTitleOnchange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditTitleOnchange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleTodo = () => {
    setTodos([...todos, { id: todoId, title: newTitle, status: "notstarted" }]);
    setNewTitle("");
    setTodoId(todoId + 1);
    console.log(todos);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo !== id));
  };

  const handleOpenEditForm = ({ id, title }) => {
    setIsEdit(true);
    setEditId(id);
    setEditTitle(title);
  };

  const handleEditTodo = () => {
    const newTodo = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodo.map((todo) =>
        todo.id === editId ? { ...todo, title: editTitle } : todo
      )
    );
    setEditTitle("");
    setIsEdit(false);
    setEditId();
  };

  const handleStatusChange = ({ id }, e) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  const handleCloseEditForm = () => {
    setEditTitle("");
    setIsEdit(false);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notstarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notstarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      {!isEdit ? (
        <>
          <input
            type="text"
            label="タイトル"
            value={newTitle}
            onChange={handleNewTitleOnchange}
          />
          <button onClick={handleTodo}>作成</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={handleEditTitleOnchange}
          />
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </>
      )}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">すべて</option>
        <option value="notstarted">未着手</option>
        <option value="inProgress">作業中</option>
        <option value="done">完了</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(todo, e)}
              >
                <option value="notStarted">未着手</option>
                <option value="inProgress">作業中</option>
                <option value="done">完了</option>
              </select>
              <button onClick={() => handleOpenEditForm(todo)}>編集</button>
              <button onClick={() => handleDeleteTodo(todo)}>削除</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
