import { useSelector } from "react-redux";
import "../../styles/saved-recipe-view.css";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const SavedRecipeView=()=>{
    const userSlice=useSelector((state)=>state.userDetails)

    // const saveAsPdf=()=>{
    //     const input=document.querySelector("#exportToPdf")
    //     html2canvas(input,{logging: true, letterRendering: 1, useCORS: true}).then(function(canvas){
    //         const imgData=canvas.toDataURL("image/jpeg")
    //         const pdf=new jsPDF("p","pt","a4");
    //         // const imgProps=pdf.getImageProperties(imgData)
    //         pdf.addImage(imgData,"JPG",0,0)
    //         pdf.save("saved-recipe.pdf")
    //     })
        
    // }

   
    return(
        <>
            <center>   
                <div className="saved-view-body">
                <h2 className="view-saved-head">Here is a detailed Recipe..!</h2>
                    <div className="view-table">
                {
                    userSlice.savedRecipes.map((recipes)=>{
                        if(recipes.recipe_name==userSlice.recipe_name){
                            return(
                                  <div className="saved-view-box">                           
                                <img src={recipes.recipe_image} width={"30%"} className="saved-recipe-image" />
                                
                               
                                <h3 className="recipe-name">{recipes.recipe_name}</h3>
                                <div className="saved-category">
                                {recipes.recipe_category!="AI" ? <h5>Category: {recipes.recipe_category}</h5>:null  }

                                   
                                </div>
                                <div className="ingredients-container">                    
                                    <h4>Ingredients</h4>                     
                                    <p className="saved-ingredients-para">{recipes.recipe_ingredients}</p>
                                </div>
                                <div className="saved-instruction">
                                    <h4>Instructions</h4>
                                    <p className="saved-instruction-para">{recipes.recipe_instructions}</p>
                                </div>
                                <div className="recipe-video">
                                    <p><Link to={recipes.recipe_url}>Watch Video</Link></p>
                                </div>

                                </div> 
                                


                            
                           
                            )
                        }
                    })
                }
                </div>
                        
                        </div>
                        </center>

                

        </>
    )

}
export default SavedRecipeView