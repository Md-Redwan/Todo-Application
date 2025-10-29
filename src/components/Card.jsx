import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";

const Card = () => {
  const [Todo, setTodo] = useState("");

  const [AllTodo, setAllTodo] = useState([]);

  const [Edit,setEdit] = useState(false)

  const [id,setId] = useState(1)

  const [editTask, setEditTask] = useState("")

  const notify = () => {
    return(
       Todo == ""
      ? toast.error("Enter Your Task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
      : toast.success("Your task has been successfully submitted", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
    )  
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (Todo == "") {
      notify();
    } else {
      const db = getDatabase();
      set(push(ref(db, "Todo/")), {
        TodoName: Todo,
      }).then(() => {
        notify();
        setTodo("");
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const TodoRef = ref(db, "Todo/");
    onValue(TodoRef, (snapshot) => {
      const Arr = []
      snapshot.forEach((item) => {
        Arr.push({value:item.val(),id:item.key});
      });
      setAllTodo(Arr);
    });
  }, []);


 function handleDelete(id) {
  // e,
  //   e.preventDefault();
     const db = getDatabase();
     const TodoRef = ref(db, "Todo/" + id);
     remove(TodoRef)
  };

   function handleEditBtn(e,value,id) {
    e.preventDefault()
    setEdit(!Edit)
    setEditTask(value)
    setId(id)
  };

  function handleUpdate(e) {
   e.preventDefault()
   const db = getDatabase();
   update(ref(db, 'Todo/' + id),{
    TodoName: editTask,
   }).then(()=>{
    toast.success("Your task has been successfully updated", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }),
      setEditTask("")
   })
  }

  return (
    <div className="pt-50">
      <div className="m-auto p-6 w-max text-center bg-white shadow-[0_20px_50px_10px_rgba(238,238,238,0.3)] rounded-2xl">
        <h1 className="text-4xl font-bold">Todo List</h1>
        <div className="mt-6 flex">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          {
            !Edit ?
            <input
            value={Todo}
            type="text"
            id="text"
            placeholder="Enter Your Task"
            className="outline-none border-2 border-solid border-black w-80 h-12 text-[20px] rounded-l-2xl pl-3"
            onChange={handleChange}
          /> :
          <input
            value={editTask}
            onChange={(e)=> setEditTask(e.target.value)}
            type="text"
            id="text"
            placeholder="Update Your Task"
            className="outline-none border-2 border-solid border-black w-80 h-12 text-[20px] rounded-l-2xl pl-3"
          />
          }
          {
            !Edit ?
          <button
            className="text-white bg-black px-[27px] rounded-r-2xl cursor-pointer"
            onClick={handleClick}
          >
            Add
          </button> :
          <button
            className="text-white bg-green-400 px-4 rounded-r-2xl cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>
          }
        </div>

        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-5 text-left">

          {AllTodo.map((item,idx)=>{
            return(
            <li key={idx} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
              {item.value.TodoName}
              <div className="flex gap-2 items-center">
              <button onClick={(e)=> handleEditBtn(e,item.value.TodoName, item.id)}><FaEdit className="text-[20px] cursor-pointer"/></button>
              <button onClick={()=> handleDelete (item.id)} >< MdDelete className="text-[20px] cursor-pointer"/></button>
              </div>
            </li>
            )
          })}

          
        </ul>

      </div>
    </div>
  );
};

export default Card;
