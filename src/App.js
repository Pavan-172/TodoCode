import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export default function App() {
    const firstRender = useRef(true); // to save to local storage and not to remove when refreshed we use use ref...

    const [inputValue, setInputValue] = useState(""); //for input values
    const [todos, setTodos] = useState([]); //for todo's array

    const addToDo = (e) => {
        e.preventDefault(); //to stop reloading the page

        if (inputValue.trim() === "") return; // to avoid empty string only with spaces and to remove unwanted spaces

        setTodos([
            ...todos,
            {
                text: inputValue, //the input value we are typing
                id: uuidv4()
            }
        ]);
        setInputValue(""); //to make the input box empty after adding the task
    };

    //to remove task
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    //to save todos in local storage
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else {
            localStorage.setItem("Todo", JSON.stringify([...todos]));
        }
    }, [todos]);

    //to get them on to display from local storage
    useEffect(() => {
        if (localStorage.getItem("Todo") !== null) {
            const newTodos = localStorage.getItem("Todo");
            setTodos(JSON.parse([...todos, newTodos]));
        }
    }, []);

    return ( < div className = "App" >
            <
            div className = "container" >
            <
            form onSubmit = { addToDo } >
            <
            input type = "text"
            placeholder = "Add a Task !!!"
            value = { inputValue }
            onChange = {
                (e) => setInputValue(e.target.value)
            }
            /> <button type = "submit" > Add </button >
            </form> {
            todos.map((todo) => {
                return ( < div key = { todo.id }
                    className = "todo" >
                    <
                    p > { todo.text } </p>   <
                    i onClick = {
                        () => removeTodo(todo.id)
                    }
                    className = "fas fa-trash-alt" >
                    </i> 
                     </div>
                );
            })
        } </div> 
         </div>
);
}
