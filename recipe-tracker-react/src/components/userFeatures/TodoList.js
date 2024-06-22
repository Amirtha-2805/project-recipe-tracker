import { useEffect, useState } from "react"
import "../../styles/todolist.css"
import { useSelector,useDispatch } from "react-redux"
import Select from 'react-select'
import axios from "axios"
import { setUserTodoList,userFeature } from "../../redux/slices/userSlice"
import { Link } from "react-router-dom"



const TodoList=()=>{
    const userSliceDetails=useSelector((state)=>state.userDetails.savedRecipes)
    const userTodo=useSelector((state)=>state.userDetails.userTodoList)
    const userSliceId=useSelector((state)=>state.userDetails)

    const[selectedRecipe,setSelectedRecipe]=useState("")
    const [dateTimeValue, setDateTimeValue] = useState('');
    let dispatch=useDispatch()
    const handleChange=(selected)=>{
        setSelectedRecipe(selected)
    }
   let showoptions= userSliceDetails.map((saved)=>{
        return({
            value: saved.recipe_name,
            label: saved.recipe_name               
        })
    })
    const handleDateTimeChange = (event) => {
        setDateTimeValue(event.target.value);
    };
   
    let todoForm=new FormData()
    todoForm.append("user_id",userSliceId.userAllDetails.id)
    todoForm.append("selected_recipe",selectedRecipe.label)
    todoForm.append("selected_datetime",dateTimeValue)

    const selectedRecipeSubmit=()=>{       
        axios.post("https://amirtha14.pythonanywhere.com/storetodolist",todoForm)
        alert("submitted")
        get_user_todo()
    }       
    const get_user_todo=()=>{
        axios.get(`https://amirtha14.pythonanywhere.com/getusertodo/${userSliceId.userAllDetails.id}`).then((res)=>{
            dispatch(setUserTodoList(res.data))
        })
    }
    useEffect(()=>{
        get_user_todo()
    },[])
   
    const deleteTodo=(todoid)=>{
        axios.delete(`https://amirtha14.pythonanywhere.com/deletetodo/${todoid}`).then((res)=>{
            alert("Todo item deleted")
            get_user_todo()
        })
    }
    
    return(
        <>
        <center>
            <div className="todo-body">
            <div className="container">               

            <h1 className="recipe-list-head">Todo List</h1>
 
            <div className="input-container-todo"> 
                
                <div className="recipe-input">
                           <form>
                     <div className="select">
                         <div className="selectsaved-box">
                         <Select options={showoptions} placeholder="Select recipe" onChange={handleChange} id="category"/>                                
                         </div>
                     </div>
                     <br/>
                    <div className="input-group input-lg">
                        <label>Date and Time</label>
                        <input type="datetime-local" className="form-control" onChange={handleDateTimeChange}/>
                    </div>                    
                    <div className="saved-submit-button">
                        <button type="button" className="btn btn-warning" id="savedrec-submit-btn" onClick={()=>selectedRecipeSubmit()}>Submit</button>
                    </div>
                    </form>
                    </div>

                </div>
            </div>
        <hr/>
        <div className="container" >
           
           
            <div className="col-md-8">   
                <center>
            <table border={1}  className="table table-dark table-striped-columns" id="todotable">
                <thead>
                    <tr>
                        <th>Scheduled Recipes</th>
                        <th>Scheduled datetime</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userTodo.map((todo,i)=>{
                            return(
                                <>
                                    <tr key={i}>
                                        <td>{todo.selected_recipe}</td>
                                        <td>{todo.selected_datetime}</td>
                                        <td><Link to={`/todoedit/${todo.user_todoId}`}>Edit</Link></td>
                                        <td><Link onClick={()=>deleteTodo(todo.user_todoId)}>Delete</Link></td>

                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
                
            </table> 
            </center>
            
            </div>
            </div> 
            </div>      
          
        </center>
        </>
    )

}
export default TodoList