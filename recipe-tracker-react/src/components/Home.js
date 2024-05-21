import NavBar from "./Menu";
import "../styles/home.css"
import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
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



export default function Home(){
    const dbref=collection(db,"saved_recipes")
    const question1="give me a recipe details with these ingredients and recipe image"  
    const[ingredientsInput,setIngredientsInput]=useState([])
    const[result,setResult]=useState("")
    const[isLoading,setLoading]=useState(null)
    const[fireBase,setFireBase]=useState([])
    const[recipe,setRecipe]=useState("")
    const[defaultRecipes,setDefaultRecipes]=useState([])
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
    
   
    const firebaseFunction=()=>{
        const getData= getDocs(collection(db,"ingredients")).then(docSnap=>{   
        let firebase_data=[]

        docSnap.forEach((doc)=>{
            firebase_data.push({...doc.data(),id:doc.id})
        })

        let firebase_map=firebase_data.map((fire,i)=>{
           return(fire.ingredients)
        })       
        setFireBase(firebase_map)
    })
    }   
    
        useEffect(()=>{
            firebaseFunction()
            defaultRecipesList()
        },[])
    
        let mapped_data=fireBase.map((data,i)=>{
            return({
                value: data,
                label: data               
            })
        }) 

        const defaultRecipesList=()=>{
            getDocs(collection(db,"default_recipes")).then((docSnap)=>{
                let array=[]    
                docSnap.forEach((doc)=>{
                    array.push({...doc.data(),id:doc.id})
                })
                //  console.log("state recipe",array)
                 setDefaultRecipes(array)
            })
    
        }
             
    
    // useEffect(()=>{
    //     getRecipe()   
    //    },[])

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
                    {parts:[{text:question1+recipe}]},
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
        
    const savedRecipe=(recipeId)=>{
      console.log("recipeid",recipeId)
      defaultRecipes.forEach((datas)=>{
        if(recipeId==datas.id){
            addDoc(dbref,{
                login_email:userLogin.userlogin.email,
                recipe_category:datas.category,
                recipe_image:datas.recipe_image,
                recipe_ingredients:datas.ingredients,
                recipe_instructions:datas.instructions,
                recipe_name:datas.recipe_name,
                recipe_url:datas.recipe_url
            })
           
        }
            
    })
        alert("saved")
    }
    const savedAiRecipe=()=>{
       
            addDoc(dbref,{
                login_email:userLogin.userlogin.email,
                recipe_category:"AI",                
                recipe_name:`Recipe with ${recipe}`,
                recipe_ingredients:recipe,
                recipe_instructions:result
            })
            alert("saved")
       

    }
    
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
            <center>
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
                            <button type="button" className="btn btn-warning" onClick={()=>savedAiRecipe()}>save</button>
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
            </center>  
            <h3 style={{textAlign:"center",color:"white",marginTop:"10px"}}>Vegeterian</h3> 
            {
                defaultRecipes.map((recipe,i)=>{
                    if(recipe.category=="Vegeterian"){
                        return(                            
                            <>
                            <div className="veg" key={i}>
                                <Card className="cardbody" style={{ width: '18rem'}}>
                                    <ListGroup.Item><img src={recipe.recipe_image} width={"100%"}/></ListGroup.Item>                                
                                    <Card.Header><h4>{recipe.recipe_name}</h4></Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><b>Category: </b>{recipe.category}</ListGroup.Item>
                                        <ListGroup.Item><b>Ingredients: </b>{recipe.ingredients}</ListGroup.Item>
                                        <ListGroup.Item><b>Url: </b><Link to={recipe.recipe_url}>Check Detailed Recipe</Link></ListGroup.Item>  
                                        <ListGroup.Item>
                                            <button className="btn btn-warning" width="5%" style={{marginLeft:"20px"}} onClick={()=>savedRecipe(recipe.id)}>save</button>
                                            <Link to={`defaultrecipeview/${recipe.id}`}  style={{marginLeft:"50px"}}>More</Link>                                                                                         
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card> 
                            </div>
                            </>
                        )                
                    }                    
                })                
            }
            <hr className="ruler"/>
            <h3 style={{textAlign:"center",color:"white"}}>Non Vegeterian</h3>
            {
                defaultRecipes.map((recipe,i)=>{
                    if(recipe.category=="Non-vegeterian"){
                        return(
                            <>
                            <div className="nonveg" key={i}>
                            {/* <h3>{recipe.category}</h3> */}
                            <Card className="cardbody" style={{ width: '18rem'}}>
                                <ListGroup.Item><img src={recipe.recipe_image} width={"100%"}/></ListGroup.Item>                                
                                <Card.Header><h4>{recipe.recipe_name}</h4></Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><b>Category: </b>{recipe.category}</ListGroup.Item>
                                    <ListGroup.Item><b>Ingredients: </b>{recipe.ingredients}                                    
                                    </ListGroup.Item>                                    
                                    <ListGroup.Item><b>Url: </b><Link to={recipe.recipe_url}>Check Detailed Recipe</Link></ListGroup.Item>                                            
                                    <ListGroup.Item>                                    
                                        <button className="btn btn-warning" width="5%" style={{marginLeft:"20px"}} onClick={()=>savedRecipe(recipe.id)}>save</button>
                                        <Link to={`defaultrecipeview/${recipe.id}`} style={{marginLeft:"50px"}}>More</Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                                </div> 
                            </>
    
                        )
                    }
                })
            }
        </div>
       
    </>
    
    )
    }