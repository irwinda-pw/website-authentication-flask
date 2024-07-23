# store standard routes for the login page.
from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db # means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/signin', methods=['GET', 'POST'])
def signin():
   if request.method == 'POST':
      email = request.form.get('email')
      password = request.form.get('password')

      user = User.query.filter_by(email=email).first()
      if user:
         if check_password_hash(user.password, password):
            flash("Sign in successfully!", category='success')
            login_user(user, remember=True)
            return redirect(url_for('views.home'))
         else:
            flash('Incorect password. Try again.', category='error')
      else:
         flash('Email does not exist.', category='error')
   return render_template("signin.html", user=current_user)


@auth.route('/signout')
@login_required
def signout():
   logout_user()
   return redirect(url_for('auth.signin'))

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
   if request.method == 'POST':
      username = request.form.get('username')
      email = request.form.get('email')
      password = request.form.get('password')

      user = User.query.filter_by(email=email).first()
      if user:
         flash('Email already exists.', category='error')
      else:
         new_user = User(email=email, username=username, password=generate_password_hash(password, method='scrypt', salt_length=16))
         db.session.add(new_user)
         db.session.commit()
         login_user(new_user, remember=True)
         flash('Account created !', category='success')
         return redirect(url_for('views.home'))
      
   return render_template("signup.html", user=current_user)