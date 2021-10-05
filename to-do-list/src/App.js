import React from 'react';
import './styles.css';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const localData = localStorage.getItem("todos");
    const loadedData = JSON.parse(localData);

    if (loadedData) {
      setTodos(loadedData);
    }
  }, [])

  React.useEffect(() => {
    const localData = JSON.stringify(todos);
    localStorage.setItem("todos", localData);
  }, [todos])



  function handleSubmit(event) {
    event.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complete: false
    }

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const latestTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(latestTodos);
  }

  function toggleComplete(id) {
    const latestTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.complete = !todo.complete;
      }
      return todo;
    })
    setTodos(latestTodos);
  }

  function editTodo(id){
    const latestTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(latestTodos);
    setEditingText("");
    setTodoEditing(null);
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type = "text" onChange={(event) => setTodo(event.target.value)} value={todo} />
        <button type = "submit">Add Todo</button>
      </form>
      {todos.map((todo) => <div key = {todo.id}>

        {todoEditing === todo.id ?
          (<input
            type="text"
            onChange={(event) => setEditingText(event.target.value)}
            value={editingText}
          />)
          : (<div style={{ textDecoration: todo.complete ? "line-through" : "" }}>{todo.text}</div>)}

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <button onClick={() => toggleComplete(todo.id)}>Complete</button>
        {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)}>Confirm Edit</button>)
        : (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
      </div>)}
    </div>
  );
}

export default App;
