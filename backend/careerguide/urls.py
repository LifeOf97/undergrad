from rest_framework.authtoken import views as auth_views
from django.urls import path
from . import views

app_name = "careerguide"


urlpatterns = [
    # Auth url path.
    # Send a post request containing a username and password.
    path("get-auth-token/", auth_views.obtain_auth_token, name="login"),

    # app user urls path
    path("profiles/", views.UserViewSet.as_view({"get": "list"}), name="profile-list"),
    path("profiles/create/", views.UserViewSet.as_view({"post": "create"}), name="profile-create"),
    path("profiles/<uuid:id>/", views.UserViewSet.as_view({"get": "retrieve"}), name="profile-detail"),
    path("profiles/<uuid:id>/delete/", views.UserViewSet.as_view({"delete": "destroy"}), name="profile-delete"),

    # staff urls path
    path("staffs/", views.StaffViewSet.as_view({"get": "list"}), name="staff-list"),
    path("staffs/create/", views.StaffViewSet.as_view({"post": "create"}), name="staff-create"),
    path("staffs/<str:staff_id>/", views.StaffViewSet.as_view({"get": "retrieve"}), name="staff-detail"),
    path("staffs/<str:staff_id>/update/", views.StaffViewSet.as_view({"patch": "partial_update"}), name="staff-update"),
    path("staffs/<str:staff_id>/delete/", views.StaffViewSet.as_view({"delete": "destroy"}), name="staff-delete"),

    # staff schedule urls
    path("schedules/", views.ScheduleViewSet.as_view({"get": "list"}), name="schedule-list"),
    path("staffs/<str:staff_id>/schedules/", views.ScheduleViewSet.as_view({"get": "staff_schedule_list"}), name="staff-schedule-list"),
    path("staffs/<str:staff_id>/schedules/<int:id>/", views.ScheduleViewSet.as_view({"get": "staff_schedule_retrieve"}), name="staff-schedule-detail"),
    path("staffs/<str:staff_id>/schedules/create/", views.ScheduleViewSet.as_view({"post": "create"}), name="staff-schedule-create"),
    
    # student urls path
    path("students/", views.StudentViewSet.as_view({"get": "list"}), name="student-list"),
    path("students/create/", views.StudentViewSet.as_view({"post": "create"}), name="student-create"),
    path("students/<str:department>/<str:level>/<str:reg_no>/", views.StudentViewSet.as_view({"get": "retrieve"}), name="student-detail"),
    path("students/<str:department>/<str:level>/<str:reg_no>/delete/", views.StudentViewSet.as_view({"delete": "destroy"}), name="student-delete"),
]
