from enum import unique
from flask import Flask, json,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow,Schema,fields
import datetime


from marshmallow import Schema,fields
import os
from flask_cors import CORS,cross_origin

from sqlalchemy.orm import backref, lazyload

# initilize
app= Flask(__name__)
app.debug=True;
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
    created_on = db.Column(db.DateTime, server_default=db.func.now())
   


    def __init__(self,name,email):
        self.name=name
        self.email=email

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
        blogposts=ma.Nested(blog_schema,many=True)
        created_on=fields.DateTime()

# blog Schemal




# init schema
user_schema = UserSchema()
users_schema= UserSchema(many=True)

# =====================
@app.route('/users/allblogs',methods=['GET'])
def blogs():
    # oneuser=User.query.first()
    # user_schema=UserSchema()
    # o=user_schema.dump(oneuser)
    # return jsonify(**o)
    allblogs=Blogpost.query.all()
    result=blog_schema.dump(allblogs)
    return jsonify(result)




# create user_schema
@app.route('/user',methods=['POST'])
@cross_origin()
def add_user():
    name=request.json['name']
    email=request.json['email']
    new_user=User(name,email)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)

# all users
@app.route('/users',methods=['GET'])
def get_users():
    all_user=User.query.all()
    result=users_schema.dump(all_user)
    return jsonify(result)

@app.route('/user/<user_id>',methods=['GET'])
def get_user(user_id):
    only_user=User.query.get(user_id)
    return user_schema.jsonify(only_user)    


@app.route('/user/<user_id>',methods=['PUT'])
def update_user(user_id):

    user = User.query.get(user_id)


    name=request.json['name']
    email=request.json['email']

    user.name=name
    user.email=email

    
    db.session.commit()

    return user_schema.jsonify(user)    

@app.route('/user/<user_id>',methods=['DELETE'])
def delete_user(id):
    only_user=User.query.get(id)
    db.session.delete(only_user)
    db.session.commit()
    return user_schema.jsonify(only_user)        
    
# --------------------------------------------------------------
# see all posts of specific user and create post for a specific user
@app.route('/users/<user_id>',methods=['GET','POST'])
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
    app.run(debug=True)