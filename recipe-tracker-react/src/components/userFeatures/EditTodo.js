import "../../styles/edittodo.css"
import axios from "axios"
import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";


const EditTodo=()=>{
    const [dateTimeValueEdit, setDateTimeValueEdit] = useState('');
    let {id} = useParams();
    const userSliceDetails=useSelector((state)=>state.userDetails.savedRecipes)
    const usertodoData=useSelector((state)=>state.userDetails.userTodoList)

    const [edit_usertodo,set_edit_usertodo]=useState({
        selected_recipe:"",
        selected_datetime:""
    })
    let dispatch=useDispatch()
    let navigate=useNavigate()
  
  
    const handleDateTimeChange = (event) => {
        // setDateTimeValueEdit(event.target.value);
        set_edit_usertodo({
            ...edit_usertodo,
            selected_datetime:event.target.value
        })
    };
    const getDataForEdit=(todoId)=>{
        axios.get(`https://amirtha14.pythonanywhere.com/gettodoedit/${todoId}`).then((res)=>{
            console.log("res",res)
            set_edit_usertodo({
                selected_recipe:res.data[0].selected_recipe,
                selected_datetime:res.data[0].selected_datetime
            })
        })
    }
    useEffect(()=>{
        getDataForEdit(id)
    },[id])

    let editTodoForm=new FormData();
    editTodoForm.append("selected_recipe",edit_usertodo.selected_recipe)
    editTodoForm.append("selected_datetime",edit_usertodo.selected_datetime)
    const updateTodo=()=>{
        axios.put(`https://amirtha14.pythonanywhere.com/edittodo/${id}`,editTodoForm)
        alert("updated")
        navigate("/userhome")
    }
    return(
        <>

        <div className="edit-body">
        <button id="home-link" type="button" onClick={()=>navigate("/")}><FaHome className="home-icon" /> Home</button>

            <h3 className="recipe-list-head">Edit Todo List</h3>
 
            <div className="input-container">           
                <div className="recipe-input">
                  <form>
                     <div className="input-group input-lg">
                         <label>Select Saved Recipes</label>                         
                         <input defaultValue={edit_usertodo.selected_recipe} className="form-control" onKeyUp={(e)=>set_edit_usertodo({
                            ...edit_usertodo,
                            selected_recipe:e.target.value
                         })} />                                                         
                     </div>
                    <div className="input-group input-lg">
                        <label>Date and Time</label>
                        <input type="datetime-local" className="form-control" defaultValue={edit_usertodo.selected_datetime} onChange={handleDateTimeChange}/>
                    </div>                    
                    <div className="saved-submit-button">
                        <button type="button" className="btn btn-warning" id="savedrec-submit-btn" onClick={()=>updateTodo()}>Update</button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
      
        </>
    )
}
export default EditTodo;