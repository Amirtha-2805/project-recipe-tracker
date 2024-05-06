import NavBar from "./Menu";
import "../styles/home.css"
import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import Select from 'react-select'
import Spinner from 'react-bootstrap/Spinner';

// let list_of_ingredients=require("../ingredientsList.json");


// import {config} from 'dotenv'
// import{Configuration,OpenAIAPI} from 'openai'

export default function Home(){

    const question="What kind of recipes can we make only with these ingredients and how to make it?"
    const[ingredientsInput,setIngredientsInput]=useState([])
    const[result,setResult]=useState("")
    const[isLoading,setLoading]=useState(null)
    const[fireBase,setFireBase]=useState([])
    const[recipe,setRecipe]=useState("")
    // const[selected,setSelected]=useState([])
    // const[summary,setSummary]=useState("")
    // const openAiAPI="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"

    const firebaseFunction=()=>{
        const getData= getDocs(collection(db,"ingredients")).then(docSnap=>{   
        let firebase_data=[]

        docSnap.forEach((doc)=>{
            firebase_data.push({...doc.data(),id:doc.id})
        })

        let firebase_map=firebase_data.map((fire,i)=>{
           return(fire.ingredients)
        // return(fire)
        })
        // console.log("firebasemapp",firebase_map)
        setFireBase(firebase_map)
    })
    }
    console.log("fireeee",fireBase)
    useEffect(()=>{
         firebaseFunction()
    },[])
    
        let mapped_data=fireBase.map((data,i)=>{
            return({
                value: data,
                label: data               
            })
        })
        console.log("mapped data",mapped_data)

      
    const submitIngredients=()=>{
    console.log("ingredients",ingredientsInput) 

       // getting api using openai(method 1)
        
    //     let url="https://api.openai.com/v1/chat/completions"
    //     let token=`Bearer ${openAiAPI}`
    //     let model='gpt-3.5-turbo'
    //     let ingredientsToSend={
    //         role:'user',
    //         content:question+ingredientsInput
    //     }
    //     console.log(ingredientsToSend)
    //        let response=await fetch(url,{
    //         method:'POST',
    //         headers:{
    //             'Authorization':token,
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             model:model,
    //             messages:ingredientsToSend
    //         })
    //     })
    //    let responseJson=await response.json()
    //    if(responseJson){
    //      console.log(responseJson)
    //    }




    //getting api using openai(method 2)

    // const url="https://api.openai.com/v1/chat/completions"
    // const apiKey='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'
    // const headers={
    //     'Content-Type':'application/json',
    //     'Authorization':`Bearer ${apiKey}`
    // }
    // const data={
    //     model:'gpt-3.5-turbo',
    //     messages:[
    //         {role:'system',content:"You are a helpfull assistant. and you have to summarize the text provider by the user."},
    //         {role:'user',content:ingredientsInput}
    //     ]
    // }
    // const response=await fetch(url,{
    //     method:'POST',
    //     headers,
    //     body:JSON.stringify(data)
    // })
    // const result=await response.json()
    // const summary=result.choices
    // setSummary(summary)
    // console.log(result)
        // setIngredientsInput(getSearchIngredients+",") //param variable(gerSearchIngredients)
        // console.log("searched ingredients",getSearchIngredients)

        const apikey="AIzaSyAFY0ukI1_zvQ5D0pttqZsI9RYZ-jPNyrA"
        setLoading(true) 
          axios({
            url:`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apikey}`,
            method:"POST",
            data:{
                contents:[
                    {parts:[{text:question+recipe}]},
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
   let selected=""
   const handleChange=(selectedOption)=>{

        setIngredientsInput(selectedOption)
        selectedOption.forEach((each)=>{
            selected=selected+each.label+","            
        })
        setRecipe(selected)
       
        console.log("selectinggg",selected)
   }
   console.log("recipe",recipe)

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
                            {/* <div className="ingredients">                      
                                    <input type="text" placeholder="Eg. Water,Sugar" value={ingredientsInput} className="form-control" onChange={(e)=>setIngredientsInput(e.target.value)}/>
                                    <button type="button" className="btn btn-success" onClick={()=>submitIngredients()}>Submit</button>
                                </div>                                                            
                            // {isLoading==false ? <h3>...Loading</h3>:<p>{result}</p>}    */}
                               {
                                isLoading==true ? 
                                <>
                                 <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                           </Spinner></>:null                             
                                } 
                             {result ?   <div className="resultbox">
                                <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                                <p className="result-para">{result}
                                </p>
                            </div>
                            :
                            null
                                } 
                    </div>
                </center>                                
            </div>
        </>

    )
    }