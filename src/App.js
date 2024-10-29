import { useEffect, useState } from "react";
import ToDo from "./components/ToDo"; // Import the ToDo component

// Import API functions to handle adding, fetching, updating, and deleting todos
import { addToDo, getAllToDo, updateTodo, deleteToDo } from "./utils/HandleApi";

function App() {
  // State to store the list of todos
  const [toDo, setToDo] = useState([]);
  
  // State to manage the current text input
  const [text, setText] = useState("");
  
  // State to track if the app is in "update" mode
  const [isUpdating, setIsUpdating] = useState(false);
  
  // State to track the ID of the to-do item being updated
  const [toDoId, setToDoId] = useState("");

  // useEffect hook to fetch all todos when the component first loads
  useEffect(() => {
    getAllToDo((data) => {
      console.log("Fetched toDo data:", data); // Log fetched data for debugging
      setToDo(data); // Set the fetched data to `toDo` state
    });
  }, []);

  // Function to handle updating a todo item
  const updateMode = (_id, text) => {
    setIsUpdating(true);   // Set the app to "update" mode
    setText(text);         // Set the text input to the selected item's text
    setToDoId(_id);        // Store the ID of the item being updated
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        
        {/* Input field and button for adding/updating todos */}
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDo..." // Placeholder text for the input
            value={text}              // Current value of text state
            onChange={(e) => setText(e.target.value)} // Update text state on input change
          />
          <div 
            className="add"
            onClick={
              isUpdating
                ? () => updateTodo(toDoId, text, setToDo, setText, setIsUpdating) // Update item if in "update" mode
                : () => addToDo(text, setText, setToDo) // Add new item if in "add" mode
            }
          >
            {isUpdating ? "Update" : "Add"} {/* Button label changes based on mode */}
          </div>
        </div>

        {/* List of todo items */}
        <div className="list">
          {Array.isArray(toDo) && toDo.map((item) => (
            <ToDo
              key={item._id} // Unique key for each item
              text={item.text} // Displayed text for each to-do
              updateMode={() => updateMode(item._id, item.text)} // Enter update mode for this item
              deleteToDo={() => deleteToDo(item._id, setToDo)} // Delete this item
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
