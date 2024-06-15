import os
from flask import Flask, jsonify, flash, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required


UPLOAD_FOLDER = '/home/amirtha14/mysite/assets'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="amirtha14",
    password="Agaram12345",
    hostname="amirtha14.mysql.pythonanywhere-services.com",
    databasename="amirtha14$recipe_tracker",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key="1223"
db = SQLAlchemy(app)
JWTManager(app)

# ingredients list
class Ingredients(db.Model):
    __tablename__="ingredient_list"
    ingId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    ingName=db.Column(db.String)

# admin login
class Admin_login(db.Model):
    __tablename__="admin_login"
    admin_id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    admin_name=db.Column(db.String)
    admin_email=db.Column(db.String)
    admin_password=db.Column(db.String)

# user signup
class Signup_user(db.Model):
    __tablename__="user_register"
    userId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    name=db.Column(db.String)
    email=db.Column(db.String)
    password=db.Column(db.String)
    age=db.Column(db.String)
    gender=db.Column(db.String)
    address=db.Column(db.String)
    phone=db.Column(db.String)

# default recipes
class Default_recipes(db.Model):
    __tablename__="recipe_details"
    recipeId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    recipe_name=db.Column(db.String)
    recipe_category=db.Column(db.String)
    recipe_ingredients=db.Column(db.String)
    recipe_instructions=db.Column(db.String)
    recipe_image=db.Column(db.String)
    recipe_url=db.Column(db.String)
    recipe_iframe=db.Column(db.String)

class Recipe_save(db.Model):
    __tablename__="saved_recipes"
    savedId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id=db.Column(db.Integer)
    recipe_name=db.Column(db.String)
    recipe_category=db.Column(db.String)
    recipe_ingredients=db.Column(db.String)
    recipe_instructions=db.Column(db.String)
    recipe_url=db.Column(db.String)
    recipe_image=db.Column(db.String)
    recipe_iframe=db.Column(db.String)

class User_todo(db.Model):
    __tablename__="user_todolist"
    user_todoId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    selected_recipe=db.Column(db.String)
    user_id=db.Column(db.Integer)
    selected_datetime=db.Column(db.String)

# usertodo
@app.route("/storetodolist", methods=["POST","GET"])
def store_todo_details():
    if request.method == 'POST':
        user_id = request.form.get("user_id")
        selected_recipe=request.form.get("selected_recipe")
        selected_datetime=request.form.get("selected_datetime")
        # Create a new Recipe_save object
        new_todo = User_todo(
            user_id=user_id,
            selected_recipe=selected_recipe,
            selected_datetime=selected_datetime
        )
        db.session.add(new_todo)
        db.session.commit()
        return "Success", 200

@app.route("/getusertodo/<int:id>",methods=["GET"])
def get_user_todo(id):
    get_all_todo=User_todo.query.filter_by(user_id=id).all()
    return jsonify([{
        "user_todoId":todo.user_todoId,
        "selected_recipe":todo.selected_recipe,
        "selected_datetime":todo.selected_datetime
        }for todo in get_all_todo])

@app.route("/gettodoedit/<int:id>",methods=["GET"])
def edit_todo(id):
    edit_data=User_todo.query.filter_by(user_todoId=id).first()
    return jsonify([{
        "user_todoId":edit_data.user_todoId,
        "selected_recipe":edit_data.selected_recipe,
        "selected_datetime":edit_data.selected_datetime
        }])

@app.route("/edittodo/<int:id>",methods=["PUT"])
def editTodo(id):
    editTodoList=User_todo.query.filter_by(user_todoId=id).first()
    editTodoList.selected_recipe=request.form["selected_recipe"]
    editTodoList.selected_datetime=request.form["selected_datetime"]
    db.session.commit()
    return jsonify({"message":"Edited"})

@app.route("/deletetodo/<int:id>",methods=["DELETE"])
def delete_todo(id):
    delete_data=User_todo.query.filter_by(user_todoId=id).first()
    db.session.delete(delete_data)
    db.session.commit()
    return "Deleted"



# image+default
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/saverecipe", methods=["POST"])
def save_recipe():
    if request.method == 'POST':
        # Get data from the request
        user_id = request.form.get("user_id")
        recipe_name = request.form.get("recipe_name")
        recipe_category = request.form.get("recipe_category")
        recipe_ingredients = request.form.get("recipe_ingredients")
        recipe_instructions = request.form.get("recipe_instructions")
        recipe_url = request.form.get("recipe_url")
        recipe_image = request.form.get("recipe_image")
        recipe_iframe = request.form.get("recipe_iframe")

        # Create a new Recipe_save object
        new_recipe = Recipe_save(
            user_id=user_id,
            recipe_name=recipe_name,
            recipe_category=recipe_category,
            recipe_ingredients=recipe_ingredients,
            recipe_instructions=recipe_instructions,
            recipe_url=recipe_url,
            recipe_image=recipe_image,
            recipe_iframe=recipe_iframe
        )

        # Add the new recipe to the database
        db.session.add(new_recipe)
        db.session.commit()
        return "Success", 200

@app.route("/getsavedrecipes/<int:id>", methods=["GET"])
@jwt_required()
def get_saved_recipes(id):
    recipes=Recipe_save.query.filter_by(user_id=id).all()
    return jsonify([{
        "savedId":saved.savedId,
        "recipe_name":saved.recipe_name,
        "recipe_category":saved.recipe_category,
        "recipe_ingredients":saved.recipe_ingredients,
        "recipe_instructions":saved.recipe_instructions,
        "recipe_image":f'https://www.pythonanywhere.com/user/amirtha14/files/home/amirtha14/mysite/assets/{saved.recipe_image}',
        "recipe_url":saved.recipe_url,
        "recipe_iframe":saved.recipe_iframe

        }for saved in recipes])

@app.route("/deletesaveddata/<int:id>", methods=["POST"])
def delSavedRecipe(id):
    deletesavedItem=Recipe_save.query.filter_by(savedId=id).first()
    db.session.delete(deletesavedItem)
    db.session.commit()
    return "deleted"

# @app.route("/deletesavedaidata/<str:name>", methods=["DELETE"])
# def delSavedaiRecipe(name):
#     deletesavedaiItem=Recipe_save.query.filter_by(recipe_name=name).first()
#     db.session.delete(deletesavedaiItem)
#     db.session.commit()

@app.route('/upload', methods=['GET', 'POST'])
@jwt_required()
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            set_default=Default_recipes(recipe_name=request.form["recipe_name"],recipe_category=request.form["recipe_category"],recipe_ingredients=request.form["recipe_ingredients"],recipe_instructions=request.form["recipe_instructions"],recipe_image=filename,recipe_url=request.form["recipe_url"],recipe_iframe=request.form["recipe_iframe"])
            db.session.add(set_default)
            db.session.commit()
            return "success"

@app.route("/getdefault",methods=["GET"])
@jwt_required()
def getDefault():
    getdefault_recipes=Default_recipes.query.all()
    return jsonify([
        {"recipeId":derecipes.recipeId,
         "recipe_name":derecipes.recipe_name,
         "recipe_category":derecipes.recipe_category,
         "recipe_ingredients":derecipes.recipe_ingredients,
         "recipe_instructions":derecipes.recipe_instructions,
         "recipe_image":f'https://www.pythonanywhere.com/user/amirtha14/files/home/amirtha14/mysite/assets/{derecipes.recipe_image}',
         "image_name":derecipes.recipe_image,
         "recipe_url":derecipes.recipe_url,
         "recipe_iframe":derecipes.recipe_iframe

            } for derecipes in getdefault_recipes
        ])
@app.route("/gethomerecipes",methods=["GET"])
def getHomeRecipe():
    gethome=Default_recipes.query.all()
    return jsonify([
        {"recipeId":derecipes.recipeId,
         "recipe_name":derecipes.recipe_name,
         "recipe_category":derecipes.recipe_category,
         "recipe_ingredients":derecipes.recipe_ingredients,
         "recipe_instructions":derecipes.recipe_instructions,
         "recipe_image":f'https://www.pythonanywhere.com/user/amirtha14/files/home/amirtha14/mysite/assets/{derecipes.recipe_image}',
         "image_name":derecipes.recipe_image,
         "recipe_url":derecipes.recipe_url,
         "recipe_iframe":derecipes.recipe_iframe

            } for derecipes in gethome
        ])

@app.route("/viewrecipe/<int:id>",methods=["GET"])
def viewRecipe(id):
    view_default=Default_recipes.query.filter_by(recipeId=id).first()
    return jsonify([{
        "recipeId":view_default.recipeId,
        "recipe_name":view_default.recipe_name,
        "recipe_category":view_default.recipe_category,
        "recipe_ingredients":view_default.recipe_ingredients,
        "recipe_instructions":view_default.recipe_instructions,
        "recipe_image":f'https://www.pythonanywhere.com/user/amirtha14/files/home/amirtha14/mysite/assets/{view_default.recipe_image}',
        "image_name":view_default.recipe_image,
        "recipe_url":view_default.recipe_url,
        "recipe_iframe":view_default.recipe_iframe
        }])

@app.route("/deletedefault/<int:id>",methods=["DELETE"])
def delete_default(id):
    deleteDefault_item=Default_recipes.query.filter_by(recipeId=id).first()
    db.session.delete(deleteDefault_item)
    db.session.commit()

@app.route("/editdefault/<int:id>",methods=["PUT","GET"])
def edit_default(id):
    if request.method == 'PUT':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            edit_default_item=Default_recipes.query.filter_by(recipeId=id).first()
            edit_default_item.recipe_name=request.form["recipe_name"]
            edit_default_item.recipe_ingredients=request.form["recipe_ingredients"]
            edit_default_item.recipe_instructions=request.form["recipe_instructions"]
            edit_default_item.recipe_category=request.form["recipe_category"]
            edit_default_item.recipe_image=filename
            edit_default_item.recipe_url=request.form["recipe_url"]
            edit_default_item.recipe_iframe=request.form["recipe_iframe"]
            db.session.commit()
        return "successfully updated"


# ingredients
@app.route('/getingredients', methods=["GET"])
@jwt_required()
def getIngredient_list():
    getIngredient=Ingredients.query.all()
    return jsonify([
        {"ingId":ingredient.ingId,
         "ingName":ingredient.ingName} for ingredient in getIngredient
        ])
@app.route('/gethomeingredients', methods=["GET"])
def getHomeIngredient_list():
    get_home_ingredient=Ingredients.query.all()
    return jsonify([
        {"ingId":ingredient.ingId,
         "ingName":ingredient.ingName} for ingredient in get_home_ingredient
        ])
@app.route('/setingList', methods=["GET","POST"])
def setIng_list():
    if(request.method=="POST"):
        setdata=Ingredients(ingName=request.form["ingredients"])
        db.session.add(setdata)
        db.session.commit()

    return "success"

@app.route('/geting/<int:id>', methods=["GET"])
def getIngForEdit(id):
    getIng=Ingredients.query.filter_by(ingId=id).first()
    return jsonify([
        {"ingId":getIng.ingId,
         "ingName":getIng.ingName}
        ])

@app.route('/editing/<int:id>', methods=["PUT"])
def editIng(id):
    editIngList=Ingredients.query.filter_by(ingId=id).first()
    new_item=request.form["ingName"]
    editIngList.ingName=new_item
    db.session.commit()
    return jsonify({"message":"Edited"})

@app.route('/deleteingredient/<int:id>', methods=["DELETE"])
def delIngList(id):
    deleteIngItem=Ingredients.query.filter_by(ingId=id).first()
    db.session.delete(deleteIngItem)
    db.session.commit()
    return jsonify({"message":"Deleted Successfully"})


# # admin login

@app.route("/adminlogin", methods=["GET","POST"])
def get_admin_details():
    getAdminData=Admin_login.query.filter_by(admin_email=request.form["admin_email"],admin_password=request.form["admin_pwd"]).first();
    admin_token=create_access_token(identity=request.form["admin_email"])
    if(getAdminData):
        return jsonify([{
            "admin_id":getAdminData.admin_id,
            "admin_name":getAdminData.admin_name,
            "admin_email":getAdminData.admin_email,
            "admin_password":getAdminData.admin_password,
            "admin_token":admin_token
            }])
    else:
        return({"methods":"failure"})

# # user signup and login

@app.route("/usersignup", methods=["GET","POST"])
def user_signup():
    if(request.method=="POST"):
        set_signup_data=Signup_user(name=request.form["name"],email=request.form["email"],password=request.form["password"],age=request.form["age"],gender=request.form["gender"],address=request.form["address"],phone=request.form["phone"])
        db.session.add( set_signup_data)
        db.session.commit()
    return "success"

@app.route("/getuser",methods=["GET","POST"])
def get_user():
    getLoginData=Signup_user.query.filter_by(email=request.form["email"],password=request.form["password"]).first();
    user_token=create_access_token(identity=request.form["email"])
    if(getLoginData):
        return jsonify([{
                "user_id":getLoginData.userId,
                "name":getLoginData.name,
                "email":getLoginData.email,
                "age":getLoginData.age,
                "gender":getLoginData.gender,
                "address":getLoginData.address,
                "phone":getLoginData.phone,
                "user_token":user_token
                }])
    else:
        return jsonify({"status":"failure"})

@app.route("/getalluser",methods=["GET"])
@jwt_required()
def get_all_users():
    get_users=Signup_user.query.all()
    return([{
         "user_id":users.userId,
         "name":users.name,
         "email":users.email,
         "age":users.age,
         "gender":users.gender,
         "address":users.address,
         "phone":users.phone

        }for users in get_users])


@app.route("/deleteuser/<int:id>",methods=["DELETE"])
def delete_user(id):
    deleteUser=Signup_user.query.filter_by(userId=id).first()
    db.session.delete(deleteUser)
    db.session.commit()
    return jsonify({"message":"Deleted Successfully"})


