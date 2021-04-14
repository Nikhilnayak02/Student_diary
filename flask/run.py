from enum import unique
from flask import Flask, json,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow,Schema,fields
import datetime
from sqlalchemy.sql import exists  


from marshmallow import Schema,fields
import os
from flask_cors import CORS,cross_origin

from sqlalchemy.orm import backref, lazyload

# initilize
app= Flask(__name__)
app.debug=True;
port=5000
CORS(app)

# Database
basedir=os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

# Init DB
db=SQLAlchemy(app)
# Init Marshmallow
ma = Marshmallow(app)
# --------------------------------------------------------------
#user model
class User(db.Model):
    blogposts=db.relationship('Blogpost',backref='blog_owner')
    user_id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),unique=True)
    email=db.Column(db.String(100),unique=True)
    password=db.Column(db.String(100),unique=True)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
   


    def __init__(self,name,email,password):
        self.name=name
        self.email=email
        self.password=password

# Blog model one to many association
class Blogpost(db.Model):
     id=db.Column(db.Integer,primary_key=True)
     post=db.Column(db.String(100),nullable=True)
     blog_owner_id=db.Column(db.Integer,db.ForeignKey('user.user_id'))
     created_on = db.Column(db.DateTime, server_default=db.func.now())

     def __init__(self,post,blog_owner_id):
         self.post=post  
         self.blog_owner_id=blog_owner_id     
# --------------------------------------------------------------            

class BlogSchema(ma.Schema):
    class Meta:
       
        fields=("id","post","blog_owner_id","created_on")

blog_schema= BlogSchema(many=True)

# user Schemal
class UserSchema(ma.Schema):
    # class Meta:
       
        
        user_id=fields.Integer()
        name = fields.Str()
        email = fields.Str()
        password=fields.Str()
        blogposts=ma.Nested(blog_schema,many=True)
        created_on=fields.DateTime()

# blog Schemal




# init schema
user_schema = UserSchema()
users_schema= UserSchema(many=True)

# =====================
@app.route('/api/v1/users/allblogs',methods=['GET'])
def blogs():
    allblogs=Blogpost.query.all()
    result=blog_schema.dump(allblogs)
    return jsonify(result)



@app.route('/api/v1/users/blog/<user_id>',methods=['GET'])
def userblogs(user_id):
   
    userblogs=Blogpost.query.filter_by(blog_owner_id=user_id).order_by(Blogpost.id.desc()).all()
    result=blog_schema.dump(userblogs)
    return jsonify(result)    




# create user_schema
@app.route('/api/v1/user',methods=['POST'])
@cross_origin()
def add_user():
    name=request.json['name']
    email=request.json['email']
    password=request.json['password']
    if name and email and password != "":
        new_user=User(name,password,email)
        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user)

@app.route('/api/v1/user/login',methods=['POST'])
@cross_origin()
def userlogin():
    email=request.json['email']
    password=request.json['password']
    # db.session.query(db.exists().where(User.email == email and User.password== password))
    if  email and password != "":
        all_user=User.query.all()
        for u in all_user:
            if(u.email==email and u.password==password):
                return jsonify({"status":"User exists","username":u.name})
    # return jsonify('no user exists ')    

# all users
@app.route('/api/v1/users',methods=['GET'])
def get_users():
    all_user=User.query.all()
    result=users_schema.dump(all_user)
    return jsonify(result)

@app.route('/api/v1/user/<user_id>',methods=['GET'])
def get_user(user_id):
    only_user=User.query.get(user_id)
    return user_schema.jsonify(only_user)    


@app.route('/api/v1/user/<user_id>',methods=['PUT'])
def update_user(user_id):

    user = User.query.get(user_id)


    # name=request.json['name']
    email=request.json['email']

    # user.name=name
    user.email=email

    
    db.session.commit()

    return user_schema.jsonify(user)    

@app.route('/api/v1/user/<user_id>',methods=['DELETE'])
def delete_user(user_id):
    only_user=User.query.get(user_id)
    # blog_data=Blogpost.query.get()
    db.session.delete(only_user)
    db.session.commit()
    return user_schema.jsonify(only_user)        
    
# --------------------------------------------------------------
# see all posts of specific user and create post for a specific user
@app.route('/api/v1/users/<user_id>',methods=['GET','POST'])
def posts(user_id):
    post=request.json['post']
    if request.method=='POST':
        if post!='':
          new_post=Blogpost(post,user_id)
          db.session.add(new_post)
          db.session.commit()
          return user_schema.jsonify(User.query.get(user_id)) 
    # return jsonify("emptyPost")  

# ------------------------------------ &&--------------------------
# edit a post for a specific user
# @app.route('/users/<user_id>/posts/<id>/edit',methods=['GET','POST'])
# def post edit():
#     pass

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="0.0.0.0",port=port)