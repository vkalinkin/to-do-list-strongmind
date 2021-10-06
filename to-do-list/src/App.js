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
    <div className="container">
      <h2 className="header">Todo List App</h2>
      <h4>Enter in the description of you todo item into the box below and then press the Enter button.</h4>
      <h4>You can mark todo items as complete and edit or delete them using the associated buttons.</h4>
      <form onSubmit={handleSubmit}>
        <input type = "text" onChange={(event) => setTodo(event.target.value)} value={todo} />
        <button type = "submit" className="but enter">Enter</button>
      </form>
      {todos.map((todo) => <div className= "todoItem" key = {todo.id}>

        {todoEditing === todo.id ?
          (<input
            className ="inp editing"
            type="text"
            onChange={(event) => setEditingText(event.target.value)}
            value={editingText}
          />)
          : (<div style={{ textDecoration: todo.complete ? "line-through" : "" }} className="todo-descrip">{todo.text}</div>)}

        {todoEditing === todo.id ? (<button className="but confirmEdit" onClick={() => editTodo(todo.id)}>Confirm Edit</button>)
          : (<button className="but edit" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}

        <button className="but complete" onClick={() => toggleComplete(todo.id)}>Complete</button>
        <button className = "but delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
        <div className="divider"></div>

      </div>)}
    </div>
  );
}

export default App;
