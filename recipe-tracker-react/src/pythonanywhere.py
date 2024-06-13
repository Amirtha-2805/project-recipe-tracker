import os
from flask import Flask, jsonify, flash, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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
db = SQLAlchemy(app)

# ingredients list
class Ingredients(db.Model):
    __tablename__="INGREDIENT_LIST"
    ingId=db.Column(db.Integer, primary_key=True, autoincrement=True)
    ingName=db.Column(db.String)

# admin login
class Admin_login(db.Model):
    __tablename__="Admin_Login"
    admin_id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    admin_name=db.Column(db.String)
    admin_email=db.Column(db.String)
    admin_password=db.Column(db.String)

# user signup
class Signup_user(db.Model):
    __tablename__="User_Signup_Details"
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

# image+default
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
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
def getDefault():
    getdefault_recipes=Default_recipes.query.all()
    return jsonify([
        {"recipeId":derecipes.recipeId,
         "recipe_name":derecipes.recipe_name,
         "recipe_category":derecipes.recipe_category,
         "recipe_ingredients":derecipes.recipe_ingredients,
         "recipe_instructions":derecipes.recipe_instructions,
         "recipe_image":f'https://www.pythonanywhere.com/user/amirtha14/files/home/amirtha14/mysite/assets/{derecipes.recipe_image}',
         "recipe_url":derecipes.recipe_url,
         "recipe_iframe":derecipes.recipe_iframe

            } for derecipes in getdefault_recipes
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
        "recipe_url":view_default.recipe_url,
        "recipe_iframe":view_default.recipe_iframe
        }])

@app.route("/deletedefault/<int:id>",methods=["DELETE"])
def delete_default(id):
    deleteDefault_item=Default_recipes.query.filter_by(recipeId=id).first()
    db.session.delete(deleteDefault_item)
    db.session.commit()

@app.route("/editdefault/<int:id>",methods=["PUT"])
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

        new_recipe_name=request.form["recipe_name"]
        edit_default_item.recipe_name=new_recipe_name

        new_recipe_ingredients=request.form["recipe_ingredients"]
        edit_default_item.recipe_ingredients=new_recipe_ingredients

        new_recipe_instructions=request.form["recipe_instructions"]
        edit_default_item.recipe_instructions=new_recipe_instructions

        new_recipe_category=request.form["recipe_category"]
        edit_default_item.recipe_category=new_recipe_category

        new_recipe_image=filename
        edit_default_item.recipe_image=new_recipe_image

        new_recipe_url=request.form["recipe_url"]
        edit_default_item.recipe_url=new_recipe_url

        new_recipe_iframe=request.form["recipe_iframe"]
        edit_default_item.recipe_iframe=new_recipe_iframe
        db.session.commit()


 # # ingredients
@app.route('/getingredients', methods=["GET"])
def getIngredient_list():
    getIngredient=Ingredients.query.all()
    return jsonify([
        {"ingId":ingredient.ingId,
         "ingName":ingredient.ingName} for ingredient in getIngredient
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
    if(getAdminData):
        return jsonify([{
            "admin_id":getAdminData.admin_id,
            "admin_name":getAdminData.admin_name,
            "admin_email":getAdminData.admin_email,
            "admin_password":getAdminData.admin_password
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
    if(getLoginData):
        return jsonify([{
                "user_id":getLoginData.userId,
                "name":getLoginData.name,
                "email":getLoginData.email,
                "age":getLoginData.age,
                "gender":getLoginData.gender,
                "address":getLoginData.address,
                "phone":getLoginData.phone
                }])
    else:
        return jsonify({"status":"failure"})

@app.route("/getalluser",methods=["GET"])
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


