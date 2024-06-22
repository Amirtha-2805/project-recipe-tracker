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
    const question=`ingredients:${recipe}.\n Generate recipe with recipe details using only with the given ingredients and the format must be in the below sample format                      
                    RECIPE_TITLE: SAMPLE_TEXT
                    INSTRUCTIONS: SAMPLE_TEXT                    
                    `
    const[ingredientsInput,setIngredientsInput]=useState([])
    const[result,setResult]=useState("")
    const[isLoading,setLoading]=useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setisLoading] = useState(false);
    const cx = "87a79793f07984bb1"
    const cloud_apiKey="AIzaSyArwq11xmZuzo_uCxnHEmGoHFkA8RhXwY8"
    const[imageLink,setImageLink]=useState("")
    
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

    const fetchData = async (recipeNameForImage) => {
        if (!recipeNameForImage) return;
        setisLoading(true);
        setErrorMessage(null);
  
        try {
          const encodedTerm = encodeURIComponent(recipeNameForImage);
          const url = `https://www.googleapis.com/customsearch/v1?key=${cloud_apiKey}&cx=${cx}&q=${encodedTerm}&searchType=image`;
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error(`Error fetching search results: ${response.statusText}`);
          }    
          const data = await response.json();
          setSearchResults(data.items || []);
          setLink(data.items || [])
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setisLoading(false);
        }
      };

    
        let link_array=[]
        const setLink=(imglink)=>{
            imglink.forEach((result) => {
                link_array.push(result.link)           
            }) 
            console.log("array",link_array)
            setImageLink(link_array[5])
        }

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
            if (newResponse) {
                let recipeTitle = "";
                const splitIndex = newResponse.indexOf(":");                
                if (splitIndex !== -1) {
                    recipeTitle= newResponse.slice(splitIndex + 1).trim()
                    fetchData(recipeTitle)
            

                } else {
                    recipeTitle = newResponse;
                }
            }  
            setResult(newResponse)
            setLoading(false)           
        })
    }
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
        saveAiForm.append("recipe_iframe",imageLink)
        
        axios.post("https://amirtha14.pythonanywhere.com/saverecipe",saveAiForm).then((res)=>{
            alert("saved")
        })
    }
    return(
        <>
        <div className="home-body">          
           {userLogin.isLogged==true?  <Nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent" id="navbar-box" >
        <div className="container-fluid" id="custom-navbar">
          <div className="navbar-wrapper">
            <Link className="navbar-brand" to={"/"}>Recipe Tracker</Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
          <img src={noUser} className="user-no-userhome"/>
          <Link to={"/userhome"} className="user-mail" >{userLogin.userlogin.email}</Link>
          </div>
        </div>
      </Nav>:<NavBar/>}

            <center>
                <form>
                <div className="input-ingredients">        
                    <label className="homelabel" >Enter ingredients to get your special recipe..!<i className="fa fa-heart heart"></i></label>                        
                    <br/> 
                   
                    <div className="container-fluid-md">                                     
                        <Select value={ingredientsInput} id="selectbox" onChange={handleChange} onkeyUp={(e)=>setIngredientsInput(e.target.value)} isMulti options={mapped_data} placeholder="Select your ingredients" />       
                    </div>
                    <button type="button" className="btn btn-success" onClick={submitIngredients}>Submit</button>
                    <br/> 
                    <br/>   
                    {isLoading==true ? 
                        <>
                        <Spinner animation="border" role="status" style={{color:"black"}}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </>
                        : null                             
                    }  
                    {result ? 
                        <div className="resultbox">
                            <h5 className="result-heading"><b>Here is your delicious recipe..!</b></h5>  
                            <img src= {imageLink} width={"20%"} height={"auto"}/>
                            <p className="result-para">{result}</p>
                            <br/>
                            <button type="button" className="btn btn-warning" onClick={()=>saveAiRecipe()}>save</button>
                        </div>
                        : null
                    }  
                </div>
                </form>
            </center>  
            <h1 style={{textAlign:"center",color:"black",marginTop:"10px"}}>Vegeterian</h1>
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
            <hr className="ruler" style={{color:"white"}}/>
            <h1 style={{textAlign:"center",color:"black"}}>Non Vegeterian</h1>
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
                                    <ListGroup.Item><b>Ingredients: </b>{recipe.recipe_ingredients}                                    
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