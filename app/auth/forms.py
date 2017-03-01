from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField
from wtforms.validators import Regexp, EqualTo, DataRequired, Length, Email
from wtforms import ValidationError
from ..models import User

class LoginForm(FlaskForm):
    email = StringField('', validators=[DataRequired(), Email()], render_kw={"placeholder": "Email"})
    password = PasswordField('', validators=[DataRequired(), Length(8, 64)],
                        render_kw={"placeholder": "Password"})
    rem = BooleanField('Remember me')
    submit = SubmitField('Submit')

class RegisterForm(FlaskForm):
    username = StringField('', validators=[DataRequired(), Length(1, 64), Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
                                          'Usernames must have only letters, '
                                          'numbers, dots or underscores')],
                           render_kw={"placeholder": "Username"})
    email = StringField('', validators=[DataRequired(), Email(), Length(1, 64)], render_kw={"placeholder": "Email"})
    password = PasswordField('', validators=[DataRequired()], render_kw={"placeholder": "Password"})
    confirm_psd = PasswordField('', validators=[DataRequired(), EqualTo('password', message='password must be the same！')],
                                render_kw={"placeholder": "Confirm pasword"})
    register = SubmitField('Register')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email already registered')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use')

class ChangePasswordForm(FlaskForm):
    old_password = PasswordField('', validators=[DataRequired()], render_kw={"placeholder": "Old password"})
    password = PasswordField('New password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match')], render_kw={"placeholder": "Confirmed password"})
    password2 = PasswordField('Confirm new password', validators=[DataRequired()], render_kw={"placeholder": "New password"})
    submit = SubmitField('Update Password')


class PasswordResetRequestForm(FlaskForm):
    email = StringField('', validators=[DataRequired(), Length(1, 64),
                                             Email()],
                        render_kw={"placeholder": "Your registered email"})
    submit = SubmitField('Reset Password')

class PasswordResetForm(FlaskForm):
    email = StringField('', validators=[DataRequired(), Length(1, 64),
                                             Email()],
                        render_kw={"placeholder": "Email"})
    password = PasswordField('', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match')], render_kw={"placeholder": "New password"})
    password2 = PasswordField('', validators=[DataRequired()], render_kw={"placeholder": "Confirm password"})
    submit = SubmitField('Reset Password')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first() is None:
            raise ValidationError('Unknown email address.')

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


