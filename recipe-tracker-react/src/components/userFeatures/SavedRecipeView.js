import { useSelector } from "react-redux";
import "../../styles/saved-recipe-view.css";
import { Link } from "react-router-dom";


const SavedRecipeView=()=>{
    const userSlice=useSelector((state)=>state.userDetails)

    // console.log("props",recipename)
    return(
        <>
            <center>
                {
                    userSlice.savedRecipes.map((recipes)=>{
                        if(recipes.recipe_name==userSlice.recipe_name){
                            return(
                                <div className="saved-view-body">
                                <h2 className="view-head">Here is a detailed Recipe..!</h2>
                                <img src={recipes.recipe_image} width={"30%"} className="saved-recipe-image"/>
                               
                                <h3 className="recipe-name">{recipes.recipe_name}</h3>
                                <div>
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
                                <div>
                                    <p><Link to={recipes.recipe_url}>Watch Video</Link></p>
                                </div>
                            
                            </div>
                            )
                        }
                    })
                }
                        </center>
                

        </>
    )

}
export default SavedRecipeView