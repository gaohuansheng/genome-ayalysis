from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Length, Email

class LoginForm(FlaskForm):
    email = StringField('Email:', validators=[DataRequired(), Email()], id='email',)
    password = PasswordField('Password:', validators=[DataRequired(), Length(8, 64)], id='psd')
    rem = BooleanField('Remember me')
    submit = SubmitField('Submit', id='submit')

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_psd = PasswordField('Confirmed password', validators=[DataRequired()])
    register = SubmitField('Register')

