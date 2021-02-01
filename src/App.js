import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Title from './components/title';

function App() {


  let inputRef = useRef(null);


  const [list, setList] = useState([]);
  const [urlApi] = useState("https://assets.breatheco.de/apis/fake/todos/user/mimarchant");
  const [task, setTask] = useState([]);


  useEffect(() => {

    getTask(urlApi)


  }, []);

  const getTask = url => {
    fetch(url)
      .then(Response => Response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  const getUser = url => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(Response => Response.json())
      .then(data => console.log(data.result))
      .catch(error => console.log(error));
      alert('Usuario creado exitosamente')
  };
  const updateTask = (url, task) => {

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()
    ).then(data => console.log(data)

    ).catch(error => console.log(error))
    

  }

  const addTask = (e) => {
    if (e.keyCode === 13 && inputRef.value !== "") {
      /* setTask(inputRef.value); */
      setList(list.concat(inputRef.value));
      let newTasks = [...task, { label: e.target.value, done: false }]
      setTask(newTasks)
      updateTask(urlApi, newTasks)
      inputRef.value = "";



    }
    /*   const reRenderTasks = () =>{
        {
          !!task.length > 0 &&
          task.map((task, i) => {
            return (
              <li key={i} className="col-md-9 list-group-item text-start">{task}<i onClick={() => deleteTask(i)} className="fas fa-trash"></i></li>
            )
          })
        }
    
      } */

  }

  const addTask2 = () => {
    if (inputRef.value !== "") {
      setList(list.concat(inputRef.value));
      inputRef.value = "";
    }
  }

  const deleteTask = (i) => {
    
    list.splice(i, 1);
    setList([...list]);
    task.splice(i,1)
    setTask([...task])
    
    updateTask(urlApi,task)
  }

  const deleteUser = (url) => {
    fetch(url, {
      method: 'DELETE',
      
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()
    ).then(data => console.log(data)

    ).catch(error => console.log(error))
  }



  const deleteAllTasks = () => {
    setList([])
    setTask([])
    deleteUser(urlApi)
    alert('Usuario eliminado')
  }

  





  return (
    <>
      <div className="container border mt-5 fondo">
        <Title />
        <div className="d-flex mt-5">
          <input ref={r => inputRef = r} onKeyUp={addTask} className="col-md-9 form-control" placeholder="What needs to be done?" autoFocus></input>
          <button onClick={addTask2} className="btn ml-5 bg-success text-white"><i class="fas fa-thumbtack"></i></button>
        </div>
        <div className="">
          <ol className="list-group mb-5">
            {
              !!list.length > 0 &&
              list.map((task, i) => {
                return (
                  <li key={i} className="col-md-9 list-group-item text-start">{task}<i onClick={() => deleteTask(i)} className="fas fa-trash"></i></li>
                )
              })
            }


          </ol>
          <div className="text-center">
            <button className="btn bg-danger mb-3" onClick={deleteAllTasks}>delete</button>
            <button className="btn bg-info mb-3 ml-3" onClick={() => getUser(urlApi)}>Crear usuario</button>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
