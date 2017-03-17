from flask import render_template
from ..decorators import permission_required, admin_required
from ..models import Permission
from . import admin
from flask_login import login_required
@admin.route('/admin')
@login_required
@admin_required
def for_admin_only():
    return render_template("admin/admin.html")

@admin.route('/moderator')
@login_required
@permission_required(Permission.READ_DATABASE)
def for_moderators_only():
    return render_template("403.html")
