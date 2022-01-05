from .serializers import (
    ProfileHyperlinkSerializer, StaffHyperLinkSerializer, StudentHyperLinkSerializer,
    ScheduleHyperlinkSerializer, QuestionnaireHyperlinkSerializer, ObservationHyperlinkSerializer,
)
from .models import Staff, Student, Schedule, Questionnaire, Observation
from django.utils.translation import ugettext_lazy as _
from .permissions import IsSuperUser, IsOwnerOrReadOnly
from rest_framework import permissions, authentication
from .authentications import BearerAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.reverse import reverse
from rest_framework import viewsets
from rest_framework import status
from django.utils import timezone

# get the current user model
Profile = get_user_model()


class APIRootView(viewsets.ViewSet):
    """
    API root view, returns the urls to all apoi endpoint.
    """
    def list(self, request, format=None, *args, **kwargs):
        profiles = reverse("careerguide:profile-list", request=request, format=format)
        staffs = reverse("careerguide:staff-list", request=request, format=format)
        students = reverse("careerguide:student-list", request=request, format=format)

        serializer = {"profiles": profiles, "staffs": staffs, "students": students,}
        return Response(data=serializer, status=status.HTTP_200_OK)



# create views
class ProfileViewSet(viewsets.ModelViewSet):
    """
    Profile API ModelViewSet. Profile model is the user model.

    list: [Method: GET]
    Returns a list of profiles in the system.

    create: [Method: POST]
    Create a new instance of a profile user account.

    retrieve: [Method: GET]
    Returns the details of a profile user account instance.

    partial_update: [Method: PATCH]
    Update a profile user account instance, only fields to be updated are passed.

    destroy: [Method: DELETE]
    Delete a profile user account intance.
    """
    lookup_field = "id"
    queryset = Profile.objects.all()
    serializer_class = ProfileHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, format=None, *args, **kwargs):
        user = self.get_object()
        username, userid = [user.username, user.id]
        user.delete()
        serializer = {"username": username, "id": userid, "detail": "Deleted successfully"}
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class StaffViewSet(viewsets.ModelViewSet):
    """
    Staff API ModelViewset.

    list: [Method: GET]
    Returns a list of staffs in the system.

    create: [Method: POST]
    Create a new instance of a staff account.

    retrieve: [Method: GET]
    Returns the details of a staff account instance.

    partial_update: [Method: PATCH]
    Update a staff account instance, only fields to be updated are passed.

    destroy: [Method: DELETE]
    Delete a staff account intance.
    """
    lookup_field = "staff_id"
    queryset = Staff.objects.all()
    serializer_class = StaffHyperLinkSerializer
    permission_classes = [IsSuperUser, IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        # personnalize staff username field
        serializer.initial_data["profile"]["username"] = serializer.initial_data['staff_id'].upper()

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, format=None, *args, **kwargs):
        staff = self.get_object()
        name, id = [staff.staff_name(), staff.staff_id]
        serializer = {"name": name, "staff id": id, "detail": "Deleted successfully"}
        staff.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class StudentViewSet(viewsets.ModelViewSet):
    """
    Student API ModelViewset.

    list: [Method: GET]
    Returns a list of students in the system.

    create: [Method: POST]
    Create a new instance of a student account.

    retrieve: [Method: GET]
    Returns the details of a student account instance.

    partial_update: [Method: PATCH]
    Update a student account instance, only fields to be updated are passed.

    destroy: [Method: DELETE]
    Delete a student account intance.
    """
    queryset = Student.objects.all()
    serializer_class = StudentHyperLinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def get_object(self):
        # Get an object instance with the following lookup fields.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of two url kwargs
        lookup_kwargs = {
            "department": self.kwargs["department"],
            "level": self.kwargs["level"],
            "reg_no": self.kwargs["reg_no"]
        }

        obj  = get_object_or_404(self.get_queryset(), **lookup_kwargs)
        # make sure to check for object level perfomission
        self.check_object_permissions(self.request, obj)
        # then return obj instance
        return obj

    def get_queryset(self):
        queryset = super().get_queryset().order_by("id")
        return queryset



    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        # personnalize student username field
        set_username = F"{serializer.initial_data['department']}/{serializer.initial_data['level']}/{serializer.initial_data['reg_no']}"
        serializer.initial_data["profile"]["username"] = set_username.upper()

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, format=None, *args, **kwargs):
        student = self.get_object()
        name, reg_no = [student.student_name(), student.reg_no]
        serializer = {"name": name, "Reg number": reg_no, "detail": "Deleted successfully"}
        student.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class ScheduleViewSet(viewsets.ModelViewSet):
    """
    Schedule API ModelViewset.

    list: [Method: GET]
    Returns a list of schedules for a particular staff in the system.

    create: [Method: POST]
    Create a new instance of a schedule for a staff account.

    retrieve: [Method: GET]
    Returns the details of an instance of a schedule of a staff.

    partial_update: [Method: PATCH]
    Update a schedule instance of a staff account, only fields to be updated are passed.

    destroy: [Method: DELETE]
    Delete an schedule instance of a staff.
    """
    queryset = Schedule.objects.all()
    serializer_class = ScheduleHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def get_queryset(self):
        # modified queryset to return a list of schedules belonging to the
        # logged in user.
        queryset = super().get_queryset()
        queryset = queryset.filter(staff=self.request.user.staff).order_by("-created")
        return queryset


    def get_object(self):
        # Modified to return an instance of the logged in users schedule.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of two url kwargs [staff_id and instance id]
        obj = get_object_or_404(self.get_queryset(), staff__staff_id=self.request.user.staff.staff_id, id=self.kwargs["id"])

        # Make sure to check if the user has object level permission
        self.check_object_permissions(self.request, obj)
        return obj


    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        # check to make sure the expire field was filled with a date, else fill it with a date 7 days
        # in the future
        try:
            serializer.initial_data["expire"]
        except KeyError: # expire field was not passed
            serializer.initial_data["expire"] = timezone.datetime.now() + timezone.timedelta(days=7)
        else:
            if timezone.datetime.fromisoformat(serializer.initial_data["expire"]) < timezone.datetime.now():
                return Response(data={"detail": _("Expire Date cannot be in the past")}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print(F"expire: {serializer.initial_data['expire']}")

        # make sure the request comes from the currently logged in staff
        if request.user.staff.staff_id == self.kwargs["staff_id"].upper():

            if serializer.is_valid():
                serializer.save(staff=request.user.staff)
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)

            # else if serializer is not valid
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # else if logged in staff is not equal to staff_id passed
        serializer = {"detail": "You are not the owner of the account you are trying to create a schedule for!"}
        return Response(data=serializer, status=status.HTTP_406_NOT_ACCEPTABLE)

    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        # make sure the request comes from the currently logged in staff
        if request.user.staff.staff_id == self.kwargs["staff_id"].upper():

            if serializer.is_valid():
                serializer.save(staff=request.user.staff)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # else if logged in staff is not equal to staff_id passed
        serializer = {"detail": "You are not the owner of the account you are trying to create a schedule for!"}
        return Response(data=serializer, status=status.HTTP_406_NOT_ACCEPTABLE)


    def destroy(self, request, format=None, *args, **kwargs):
        schedule = self.get_object()
        staff, title = [schedule.staff.staff_id, schedule.title]
        serializer = {"staff id": staff, "title": title, "detail": "Deleted successfully"}
        schedule.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class QuestionnaireViewSet(viewsets.ModelViewSet):
    """
    Schedule API ModelViewset.

    list: [Method: GET]
    Returns a list of questionnaires for a particular staff in the system.

    create: [Method: POST]
    Create a new instance of a questionnaire for a staff account.

    retrieve: [Method: GET]
    Returns the details of an instance of a questionnaire of a staff.

    partial_update: [Method: PATCH]
    Update a questionnaire instance of a staff account, only fields to be updated are passed.

    destroy: [Method: DELETE]
    Delete an questionnaire instance of a staff.
    """
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication]

    def get_queryset(self):
        # return a list of questionnaire created by the logged in user
        queryset = super().get_queryset()
        queryset = queryset.filter(staff=self.request.user.staff).order_by("-created")
        return queryset

    def get_object(self):
        # return an instance of a questionnaire for the logged in user and the specified id.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of two url kwargs [staff_id and intance id]
        obj = get_object_or_404(self.get_queryset(), staff__staff_id=self.request.user.staff.staff_id, id=self.kwargs["id"])

        # make sure to check for object level permissions
        self.check_object_permissions(self.request, obj)
        return obj


    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request":  request})

        # First, we need to retrieve reg_no's belonging to students in each category.
        # get the categories field from the validated serializer
        categories = serializer.initial_data.get("categories")
        print(F"categories: {categories}")
        # default categories
        all_department: set = set({"art", "commercial", "science", "social science"})
        all_level: set = set({"jss1", "jss2", "jss3", "sss1", "sss2", "sss3"})
        all_gender: set = set({"male", "female"})
        
        # retrieved categories
        try:
            categories: set = set({cat for cat in categories})
        except TypeError:
            categories: set = set({})
        else:
            categories: set = set({cat for cat in categories})

        student_query = Student.objects.all()

        category: set = [student for student in student_query.filter(
            department__in=[dept for dept in all_department.intersection(categories)],
            level__in=[lvl for lvl in all_level.intersection(categories)],
            profile__gender__in=[sex for sex in all_gender.intersection(categories)]
        )]

        # then update the students field with the reg number of students in each category
        serializer.initial_data["students"] = [student.profile.id for student in category]
        # and also update the category field to a string of value
        serializer.initial_data["categories"] = ",".join(categories)
        print(serializer.initial_data["categories"])
        print(serializer.initial_data["students"])


        if serializer.is_valid():
            serializer.save(staff=request.user.staff)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        # First, we need to retrieve reg_no's belonging to students in each category.
        # get the categories field from the validated serializer
        categories = serializer.initial_data.get("categories")
        # default categories
        all_department: set = set({"art", "commercial", "science", "social science"})
        all_level: set = set({"jss1", "jss2", "jss3", "sss1", "sss2", "sss3"})
        all_gender: set = set({"male", "female"})
        
        # retrieved categories
        try:
            categories: set = set({cat for cat in categories})
        except TypeError:
            categories: set = set({})
        else:
            categories: set = set({cat for cat in categories})

        student_query = Student.objects.all()

        category: set = [student for student in student_query.filter(
            department__in=[dept for dept in all_department.intersection(categories)],
            level__in=[lvl for lvl in all_level.intersection(categories)],
            profile__gender__in=[sex for sex in all_gender.intersection(categories)]
        )]

        # then update the students field with the reg number of students in each category
        serializer.initial_data["students"] = [student.profile.id for student in category]
        # and also update the category field to a string of value
        serializer.initial_data["categories"] = ",".join(categories)
        print(serializer.initial_data["categories"])
        print(serializer.initial_data["students"])

        if serializer.is_valid():
            serializer.save(staff=request.user.staff)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, format=None, *args, **kwargs):
        question = self.get_object()
        q_id, q_title, q_completed = [question.id, question.title, question.completed]
        serializer = {"id": q_id, "title": q_title, "completed": q_completed, "detail": "Deleted successfully"}
        question.delete()
        return Response(data=serializer, status=status.HTTP_200_OK)


class ObservationViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Observation.objects.all()
    serializer_class = ObservationHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication]

    def get_queryset(self):
        # return a list of observations created by the logged in user (staff)
        queryset = super().get_queryset()

        # lookup fields from url to filter the object.
        lookup_kwargs = {
            "student__department": self.kwargs["department"],
            "student__level": self.kwargs["level"],
            "student__reg_no": self.kwargs["reg_no"],
        }
        queryset = queryset.filter(**lookup_kwargs).order_by("-created")
        return queryset

    def get_object(self):
        # return an instance of a observation for the student instance.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of the appropriate lookup fields.
        lookup_kwargs = {
            "student__department": self.kwargs["department"],
            "student__level": self.kwargs["level"],
            "student__reg_no": self.kwargs["reg_no"],
            "id": self.kwargs["id"],
        }
        obj = get_object_or_404(self.get_queryset(), **lookup_kwargs)
        # make sure to check for object level permissions
        self.check_object_permissions(self.request, obj)
        return obj

    def list(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request":  request})

        try:
            serializer.initial_data["student"] = Student.objects.get(department=self.kwargs["department"], level=self.kwargs["level"], reg_no=self.kwargs["reg_no"]).sid
        except Student.DoesNotExist:
            return Response(data={"datail": "Student with that ID does not exists."}, status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save(staff=request.user.staff)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save(staff=request.user.staff)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, format=None, *args, **kwargs):
        observation = self.get_object()
        o_id, o_student, o_created = [observation.id, observation.student.reg_no, observation.created]
        serializer = {"id": o_id, "student": o_student, "created": o_created, "detail": "Deleted successfully"}
        observation.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)