from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as auth_views
from django.urls import path
from . import views

app_name = "careerguide"


urlpatterns = [
    # API" root view ulr path
    path("", views.APIRootView.as_view({"get": "list"})),

    # Auth url path.
    # Send a post request containing a username and password.
    path("auth/signin/", auth_views.obtain_auth_token, name="login"),

    # app user urls path
    path("profiles/", views.ProfileViewSet.as_view({"get": "list"}), name="profile-list"),
    path("profiles/create/", views.ProfileViewSet.as_view({"post": "create"}), name="profile-create"),
    path("profiles/<uuid:id>/", views.ProfileViewSet.as_view({"get": "retrieve"}), name="profile-detail"),
    path("profiles/<uuid:id>/delete/", views.ProfileViewSet.as_view({"delete": "destroy"}), name="profile-delete"),

    # staff urls path
    path("staffs/", views.StaffViewSet.as_view({"get": "list"}), name="staff-list"),
    path("staffs/create/", views.StaffViewSet.as_view({"post": "create"}), name="staff-create"),
    path("staffs/<str:staff_id>/", views.StaffViewSet.as_view({"get": "retrieve"}), name="staff-detail"),
    path("staffs/<str:staff_id>/update/", views.StaffViewSet.as_view({"patch": "partial_update"}), name="staff-update"),
    path("staffs/<str:staff_id>/delete/", views.StaffViewSet.as_view({"delete": "destroy"}), name="staff-delete"),

    # staff schedule urls
    path("staffs/<str:staff_id>/schedules/", views.ScheduleViewSet.as_view({"get": "list"}), name="staff-schedule-list"),
    path("staffs/<str:staff_id>/schedules/create/", views.ScheduleViewSet.as_view({"post": "create"}), name="staff-schedule-create"),
    path("staffs/<str:staff_id>/schedules/<int:id>/", views.ScheduleViewSet.as_view({"get": "retrieve"}), name="staff-schedule-detail"),
    path("staffs/<str:staff_id>/schedules/<int:id>/delete/", views.ScheduleViewSet.as_view({"delete": "destroy"}), name="staff-schedule-delete"),
    path("staffs/<str:staff_id>/schedules/<int:id>/update/", views.ScheduleViewSet.as_view({"patch": "partial_update"}), name="staff-schedule-update"),
    
    # staffs questionnaire urls path
    path("staffs/<str:staff_id>/questionnaires/", views.QuestionnaireViewSet.as_view({"get": "list"}), name="staff-questionnaire-list"),
    path("staffs/<str:staff_id>/questionnaires/create/", views.QuestionnaireViewSet.as_view({"post": "create"}), name="staff-questionnaire-create"),
    path("staffs/<str:staff_id>/questionnaires/<int:id>/", views.QuestionnaireViewSet.as_view({"get": "retrieve"}), name="staff-questionnaire-detail"),
    path("staffs/<str:staff_id>/questionnaires/<int:id>/delete/", views.QuestionnaireViewSet.as_view({"delete": "destroy"}), name="staff-questionnaire-delete"),
    path("staffs/<str:staff_id>/questionnaires/<int:id>/update/", views.QuestionnaireViewSet.as_view({"patch": "partial_update"}), name="staff-questionnaire-update"),


    # student urls path
    path("students/", views.StudentViewSet.as_view({"get": "list"}), name="student-list"),
    path("students/create/", views.StudentViewSet.as_view({"post": "create"}), name="student-create"),
    path("students/<str:department>/<str:level>/<str:reg_no>/", views.StudentViewSet.as_view({"get": "retrieve"}), name="student-detail"),
    path("students/<str:department>/<str:level>/<str:reg_no>/update/", views.StudentViewSet.as_view({"patch": "partial_update"}), name="student-update"),
    path("students/<str:department>/<str:level>/<str:reg_no>/delete/", views.StudentViewSet.as_view({"delete": "destroy"}), name="student-delete"),

    # students observations urls path
    path("students/<str:department>/<str:level>/<str:reg_no>/observations/", views.ObservationViewSet.as_view({"get": "list"}), name="students-observation-list"),
    path("students/<str:department>/<str:level>/<str:reg_no>/observations/create/", views.ObservationViewSet.as_view({"post": "create"}), name="students-observation-create"),
    path("students/<str:department>/<str:level>/<str:reg_no>/observations/<int:id>/", views.ObservationViewSet.as_view({"get": "retrieve"}), name="students-observation-detail"),
    path("students/<str:department>/<str:level>/<str:reg_no>/observations/<int:id>/delete/", views.ObservationViewSet.as_view({"delete": "destroy"}), name="students-observation-delete"),
    path("students/<str:department>/<str:level>/<str:reg_no>/observations/<int:id>/update/", views.ObservationViewSet.as_view({"patch": "partial_update"}), name="students-observation-update"),
]

# urls can append a [url]?format=* or [url].* where * is one of ['json', 'api']
urlpatterns = format_suffix_patterns(urlpatterns, allowed=["api", "json"])