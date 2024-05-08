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


export default function Home(){

    const question="recipe name and detailed recipe with only these ingredients,"
    const[ingredientsInput,setIngredientsInput]=useState([])
    const[result,setResult]=useState("")
    const[isLoading,setLoading]=useState(null)
    const[fireBase,setFireBase]=useState([])
    const[recipe,setRecipe]=useState("")
    const[defaultRecipes,setDefaultRecipes]=useState([])
    const [messages, setMessages] = useState([
        {
            message: "",
            sender: "ChatGPT"
        }
    ]
    );
    
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
        },[])
    
        let mapped_data=fireBase.map((data,i)=>{
            return({
                value: data,
                label: data               
            })
        })
    
        getDocs(collection(db,"default_recipes")).then((docSnap)=>{
            let array=[]    
            docSnap.forEach((doc)=>{
                array.push(doc.data())
            })
            //  console.log("state recipe",array)
             setDefaultRecipes(array)

        })
       
    
    // useEffect(()=>{
    //     getRecipe()   
    //    },[])

    const submitIngredients=async(event)=>{
   
       
        //gemini
        // const apikey="AIzaSyAFY0ukI1_zvQ5D0pttqZsI9RYZ-jPNyrA"
        // setLoading(true) 
        //   axios({
        //     url:`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apikey}`,
        //     method:"POST",
        //     data:{
        //         contents:[
        //             {parts:[{text:question+recipe}]},
        //         ]
        //     },
        // }).then((response)=>{
        //     console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
        //     const text=response['data']['candidates'][0]['content']['parts'][0]['text']
            
        //     let responseArray=text.split("*");
        //     let newResponse=""
        //     for(let i=0; i<responseArray.length; i++){
        //         if(i==0 || i%2!==1){
        //             newResponse+= responseArray[i]
        //         }
        //         else{
        //             newResponse=newResponse+responseArray[i]
        //         }
        //     }       
        //     setResult(newResponse)
        //     setLoading(false)
        // })
               
        const newMessage = {
            message: question+recipe,
            sender: "user"
        }

        const newMessages = [newMessage];
        await processMessageToChatGPT(newMessages);
            }
            async function processMessageToChatGPT(chatMessages){
                const API_KEY = "sk-proj-Gkmbh6aLEBuCSTAX5MG1T3BlbkFJMqT83lgOKYLAi2Bg48Kc"
                setLoading(true)                
                let apiMessages = chatMessages.map((messageObject)=>{
                    let role="";
                    if(messageObject.sender === "ChatGPT"){
                        role = "assistant"
                    }else{
                        role = "user"
                    }
                    return (
                        {role: role, content: messageObject.message}
                    )
                });
        
                const systemMessage = {
                    role: "system",
                    content: "Explain all concept like i am 10 year old"
                }
        
                const apiRequestBody = {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        systemMessage,
                        ...apiMessages
                    ]
                }
        
                await fetch("https://api.openai.com/v1/chat/completions",{
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(apiRequestBody)
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    console.log(data.choices[0].message.content);
                    setMessages(
                        [
                            {
                                message: data.choices[0].message.content,
                                sender: "ChatGPT"
                            }
                        ]
                    )
                })
                setLoading(false)

            }
                
        let selected=""
        const handleChange=(selectedOption)=>{

                setIngredientsInput(selectedOption)
                selectedOption.forEach((each)=>{
                    selected=selected+each.label+","            
                })
                setRecipe(selected)
        }
   
    return(
        <>
          <div className="home-body">
                <NavBar/>
                <center>
                    <div className="input-ingredients">        
                        <label className="homelabel">Enter ingredients to get your special recipe..!</label>                        
                        <br/> 
                        <br/>                   
                        <Select value={ingredientsInput} onChange={handleChange} onkeyUp={(e)=>setIngredientsInput(e.target.value)} isMulti options={mapped_data} placeholder="Select your ingredients"/>
                        <br/>
                        
                        <button type="button" className="btn btn-success" onClick={()=>submitIngredients()}>Submit</button>
                           <br/> 
                           <br/>
                           
                            {/*gemini ai <div className="ingredients">                      
                                    <input type="text" placeholder="Eg. Water,Sugar" value={ingredientsInput} className="form-control" onChange={(e)=>setIngredientsInput(e.target.value)}/>
                                    <button type="button" className="btn btn-success" onClick={()=>submitIngredients()}>Submit</button>
                                </div>                                                             */}
                             {/* {
                                isLoading==true ? 
                                <>
                                 <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                           </Spinner></>:null                             
                                }  */}
                             {/* {result ?   <div className="resultbox">
                                <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                                <p className="result-para">{result}
                                </p>
                                <button type="button" className="btn btn-warning">save</button>
                            </div>
                            :
                            null
                                }  */}

                                {   
                                    isLoading==true ? 
                                    <>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </>
                                    :
                                    null                             
                                } 
                                {
                                    isLoading==false?   
                                        <div className="resultbox">
                                            <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                                            {messages.map((message, index) => {
                                                return(
                                                        <div>{message.message}</div>                        
                                                );
                                    })}                                
                                            <button type="button" className="btn btn-warning">save</button>
                                        </div>
                                        :
                                        null
                                }
                    </div>
                </center>   
            {
                defaultRecipes.map((data)=>{
                    return(
                        <>
                        <div className="card">
                             <Card className="cardbody" style={{ width: '18rem'}}>
                            <Card.Header><h4>{data.recipe_name}</h4></Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b>Category: </b>{data.category}</ListGroup.Item>
                                <ListGroup.Item><b>Ingredients: </b>{data.ingredients}</ListGroup.Item>
                                <ListGroup.Item><img src={data.recipe_image} width={"100%"}/></ListGroup.Item>                                
                                <ListGroup.Item><b>Instructions: </b><br/>{data.instructions}</ListGroup.Item>

                            </ListGroup>
                            </Card>
                            </div>
                        </>
                    )
                   
                })
            }
            </div>
        </>
    )
    }