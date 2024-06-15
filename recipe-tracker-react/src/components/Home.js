import NavBar from "./Menu";
import "../styles/home.css"
import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import Select from 'react-select'
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setIsLogged } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import noUser from "../styles/no-user.webp";
import { useDispatch } from "react-redux";
import { userFeature,setAiLog } from "../redux/slices/userSlice";
import Footer from "./Footer";
import { setDefaultRecipes,setIngredientList } from "../redux/slices/adminSlice";

const Home=()=>{
    let defaultDetails=useSelector((state)=>state.adminDetails.defaultRecipes);
    let ingredientListglobal=useSelector((state)=>state.adminDetails.ingredientList)
    const[recipe,setRecipe]=useState("")
    // const question="Recipe details only with these ingredients and provide the recipe name in bold"  
    const question=`Generate recipe with preparation using below ingredients. Recipe Title should be Bold and below format ingredients:${recipe} Recipe Title Format : RECIPE_TITLE : =>TITLE<=`
    const[ingredientsInput,setIngredientsInput]=useState([])
    const[result,setResult]=useState("")
    const[isLoading,setLoading]=useState(null)
    const[ingredients,setIngredients]=useState([])

    const content = result;
    const matches = content.match(/=>(.*?)</);
    const recipeName = matches ? matches[1].trim() : null;
    console.log("recipe_name",recipeName)

console.log(result);
   
    let dispatch=useDispatch()
    const [messages, setMessages] = useState([
        {
            message: "",
            sender: "ChatGPT"
        }
    ]
    );
    let navigate=useNavigate()
    const userLogin=useSelector((state)=>state.userDetails)
    
   
    const getAllIng=async()=>{ 
        let admin_token=localStorage.getItem("admin_token")
        let parsed_admin_token=JSON.parse(admin_token) 
        const headers={"Authorization":`Bearer ${parsed_admin_token}`}                
       await axios.get("https://amirtha14.pythonanywhere.com/gethomeingredients",{headers}).then((res)=>{
            dispatch(setIngredientList(res.data))
       })
    } 

    let mapped_data=ingredientListglobal.map((data)=>{
            return({
                value: data.ingName,
                label: data.ingName               
            })
        }) 

    const getDefault=()=>{               
        axios.get("https://amirtha14.pythonanywhere.com/gethomerecipes").then((res)=>{
           dispatch(setDefaultRecipes(res.data))
        })
    }

    useEffect(()=>{
            getAllIng()
            getDefault()
    },[])
        

    const submitIngredients=async(event)=>{
        if(userLogin.isLogged==false){
            dispatch(setAiLog(true))
            alert("Please Login First")
            navigate("/userlogin")            
        }
          
        //gemini
        else{
        const apikey="AIzaSyAFY0ukI1_zvQ5D0pttqZsI9RYZ-jPNyrA"
        setLoading(true) 
          axios({
            url:`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apikey}`,
            method:"POST",
            data:{
                contents:[
                    {parts:[{text:question}]},
                ]
            },
        }).then((response)=>{
            console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
            const text=response['data']['candidates'][0]['content']['parts'][0]['text']
            
            let responseArray=text.split("*");
            let newResponse=""
            for(let i=0; i<responseArray.length; i++){
                if(i==0 || i%2!==1){
                    newResponse+= responseArray[i]
                }
                else{
                    newResponse=newResponse+responseArray[i]
                }
            }       
            setResult(newResponse)
            setLoading(false)
        })
    }
        
         //open ai      
        // const newMessage = {
        //     message: question+recipe,
        //     sender: "user"
        // }

        // const newMessages = [newMessage];
        // await processMessageToChatGPT(newMessages);
        //     }
        // async function processMessageToChatGPT(chatMessages){
        //         const API_KEY = "sk-proj-Gkmbh6aLEBuCSTAX5MG1T3BlbkFJMqT83lgOKYLAi2Bg48Kc"
        //         setLoading(true)                
        //         let apiMessages = chatMessages.map((messageObject)=>{
        //             let role="";
        //             if(messageObject.sender === "ChatGPT"){
        //                 role = "assistant"
        //             }else{
        //                 role = "user"
        //             }
        //             return (
        //                 {role: role, content: messageObject.message}
        //             )
        //         });
        
        //         const systemMessage = {
        //             role: "system",
        //             content: "Explain all concept like i am 10 year old"
        //         }
        
        //         const apiRequestBody = {
        //             "model": "gpt-3.5-turbo",
        //             "messages": [
        //                 systemMessage,
        //                 ...apiMessages
        //             ]
        //         }
        
        //         await fetch("https://api.openai.com/v1/chat/completions",{
        //             method: "POST",
        //             headers: {
        //                 "Authorization": `Bearer ${API_KEY}`,
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(apiRequestBody)
        //         }).then((response)=>{
        //             return response.json();
        //         }).then((data)=>{
        //             console.log(data.choices[0].message.content);
        //             setMessages(
        //                 [
        //                     {
        //                         message: data.choices[0].message.content,
        //                         sender: "ChatGPT"
        //                     }
        //                 ]
        //             )
        //         })
        //         setLoading(false)

            }
                
        let selected=""
        const handleChange=(selectedOption)=>{
                setIngredientsInput(selectedOption)
                selectedOption.forEach((each)=>{
                    selected=selected+each.label+","            
                })
                setRecipe(selected)
        }

    const saveRecipe=(recipeId)=>{
      console.log("recipeid",recipeId)
      if(userLogin.isLogged==false){
        dispatch(setAiLog(true))
        alert("Please Login First")
        navigate("/userlogin")            
    }
      else{
        defaultDetails.forEach((datas)=>{
            if(recipeId==datas.recipeId){
                let saveForm=new FormData()        
                saveForm.append("user_id",userLogin.userAllDetails.id)
                saveForm.append("recipe_name",datas.recipe_name)
                saveForm.append("recipe_category",datas.recipe_category)
                saveForm.append("recipe_ingredients",datas.recipe_ingredients)
                saveForm.append("recipe_instructions",datas.recipe_instructions)
                saveForm.append("recipe_url",datas.recipe_url)
                saveForm.append("recipe_image",datas.image_name)
                saveForm.append("recipe_iframe",datas.recipe_iframe)
                
                axios.post("https://amirtha14.pythonanywhere.com/saverecipe",saveForm).then((res)=>{
                    alert("saved")
                })    
                   
            }               
        })
      }      
    }
   
    const saveAiRecipe=()=>{
        let saveAiForm=new FormData()        
        saveAiForm.append("user_id",userLogin.userAllDetails.id)
        saveAiForm.append("recipe_name",`Recipe with ${recipe}`)
        saveAiForm.append("recipe_category","AI")
        saveAiForm.append("recipe_ingredients",recipe)
        saveAiForm.append("recipe_instructions",result)
        saveAiForm.append("recipe_url","")
        saveAiForm.append("recipe_image","")
        saveAiForm.append("recipe_iframe","")
        
        axios.post("https://amirtha14.pythonanywhere.com/saverecipe",saveAiForm).then((res)=>{
            alert("saved")
        })
    }
   
    // const fetchData =() => {
       

    //         const options = {
    //         method: 'GET',
    //         url: 'https://img4me.p.rapidapi.com/',
    //         params: {
    //             text: 'Test Me',
    //             font: 'trebuchet',
    //             size: '12',
    //             fcolor: '000000',
    //             bcolor: 'FFFFFF',
    //             type: 'png'
    //         },
    //         headers: {
    //             'X-RapidAPI-Key': 'e5d60c81f5mshe7a9c742c01c3efp1cd495jsncac2fb52ec03',
    //             'X-RapidAPI-Host': 'img4me.p.rapidapi.com'
    //         }
    //         };

    //         try {
    //             const response = axios.request(options);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //   }
    
    return(
        <>
        <div className="home-body">
        {userLogin.isLogged==true?  <Navbar expand="lg" className="custom-navbar">
              <Navbar.Brand href="/">Recipe Tracker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <div className="user-data">
                      <img src={noUser} className="user-no-userhome"/>
                     <Link to={"/userhome"} className="user-mail" >{userLogin.userlogin.email}</Link>
                     </div>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>:<NavBar/>}

          {/* {adminLoginStatus.adminisLogged==true?  <Navbar expand="lg" className="custom-navbar">
              <Navbar.Brand href="/">Recipe Tracker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <div className="user-data">
                      <img src={noUser} className="user-no-userhome"/>
                     <Link to={"/userhome"} className="user-mail" >{adminLoginStatus.adminlogin.admin_email}</Link>
                     </div>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>:<NavBar/>}   */}

          {/* <button type="button" onClick={()=>fetchData()}>Generate Image</button> */}
            <center>
                <form>
                <div className="input-ingredients">        
                    <label className="homelabel">Enter ingredients to get your special recipe..!</label>                        
                    <br/> 
                    <br/>                   
                    <Select value={ingredientsInput} onChange={handleChange} onkeyUp={(e)=>setIngredientsInput(e.target.value)} isMulti options={mapped_data} placeholder="Select your ingredients"/>
                    <br/>
                    
                    <button type="button" className="btn btn-success" onClick={submitIngredients}>Submit</button>
                    <br/> 
                    <br/>                            
                    {isLoading==true ? 
                        <>
                        <Spinner animation="border" role="status" style={{color:"white"}}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </>
                        : null                             
                    }  
                    {result ? 
                        <div className="resultbox">
                            <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                            <p className="result-para">{result}</p>
                            <button type="button" className="btn btn-warning" onClick={()=>saveAiRecipe()}>save</button>
                        </div>
                        : null
                    }  
                    {/* open ai */}
                    {/* {   
                        isLoading==true ? 
                        <>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </>
                        : null                             
                    } 
                    {
                        isLoading==false ?   
                        <div className="resultbox">
                            <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                            {messages.map((message, index) => {
                                return(
                                    <div>{message.message}</div>                        
                                );
                            })}                                
                            <button type="button" className="btn btn-warning">save</button>
                        </div>
                        : null
                    } */}
                </div>
                </form>
            </center>  
            <h1 style={{textAlign:"center",color:"white",marginTop:"10px"}}>Vegeterian</h1>
            <div className="veg"> 
            {
                defaultDetails.map((recipe,i)=>{
                    if(recipe.recipe_category=="Vegeterian"){
                        return(                            
                            <>
                            <div key={i}>
                            <form>

                                <Card className="cardbody" style={{ width: '18rem'}}>
                                    <ListGroup.Item><img src={recipe.recipe_image} width={"100%"}/></ListGroup.Item>                                
                                    <Card.Header><h4>{recipe.recipe_name}</h4></Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><b>Category: </b>{recipe.recipe_category}</ListGroup.Item>
                                        <ListGroup.Item><b>Ingredients: </b>{recipe.recipe_ingredients}</ListGroup.Item>
                                        <ListGroup.Item><b></b><Link to={recipe.recipe_url}>YouTube</Link></ListGroup.Item>  
                                        <ListGroup.Item>
                                            <button className="btn btn-warning" width="5%" style={{marginLeft:"20px"}} type="button" onClick={()=>saveRecipe(recipe.recipeId)}>save</button>
                                            <Link to={`defaultrecipeview/${recipe.recipeId}`}  style={{marginLeft:"50px"}}>View</Link>                                                                                         
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card> 
                            </form>

                            </div>
                            </>
                        )                
                    }                    
                })                
            }
            </div>
            <hr className="ruler"/>
            <h1 style={{textAlign:"center",color:"white"}}>Non Vegeterian</h1>
            <div className="nonveg">
            {
                defaultDetails.map((recipe,i)=>{
                    if(recipe.recipe_category=="Non-vegeterian"){
                        return(
                            <>
                            <div key={i}>
                            <form>

                            <Card className="cardbody" style={{ width: '18rem'}}>
                                <ListGroup.Item><img src={recipe.recipe_image} width={"100%"}/></ListGroup.Item>                                
                                <Card.Header><h4>{recipe.recipe_name}</h4></Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Category: </b>{recipe.recipe_category}</ListGroup.Item>
                                    <ListGroup.Item><b>Ingredients: </b>{recipe.ingredients}                                    
                                    </ListGroup.Item>                                    
                                    <ListGroup.Item><b></b><Link to={recipe.recipe_url}>YouTube</Link></ListGroup.Item>                                            
                                    <ListGroup.Item>                                    
                                        <button className="btn btn-warning" width="5%" style={{marginLeft:"20px"}} type="button" onClick={()=>saveRecipe(recipe.recipeId)}>save</button>
                                        <Link to={`defaultrecipeview/${recipe.recipeId}`} style={{marginLeft:"50px"}}>View</Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            </form>

                                </div> 
                            </>
    
                        )
                    }
                })
            }
            </div>
           

        </div>
       <Footer/>

    </>
    
    )
    }
    export default Home;