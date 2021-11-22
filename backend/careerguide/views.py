from .serializers import (
    ProfileHyperlinkSerializer, StaffHyperLinkSerializer, StudentHyperLinkSerializer,
    ScheduleHyperlinkSerializer, QuestionnaireHyperlinkSerializer,
)
from .models import Staff, Student, Schedule, Questionnaire
from .permissions import IsSuperUser, IsOwnerOrReadOnly
from rest_framework import permissions, authentication
from .authentications import BearerAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status


# get the current user model
Profile = get_user_model()


# create views
class ProfileViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Profile.objects.all()
    serializer_class = ProfileHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def list(self, request, format=None):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, id=None, format=None):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, id=None, format=None):
        user = self.get_object()
        username, userid = [user.username, user.id]
        user.delete()
        serializer = {"username": username, "id": userid, "detail": "Deleted"}
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class StaffViewSet(viewsets.ModelViewSet):
    lookup_field = "staff_id"
    queryset = Staff.objects.all()
    serializer_class = StaffHyperLinkSerializer
    permission_classes = [IsSuperUser, IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def list(self, request, format=None):
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


    def partial_update(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, format=None, *args, **kwargs):
        staff = self.get_object()
        name, id = [staff.staff_name(), staff.staff_id]
        serializer = {"full name": name, "staff id": id, "detail": "Deleted"}
        staff.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class StudentViewSet(viewsets.ModelViewSet):
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


    def list(self, request, format=None):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def retrieve(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={"request": request})

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
        serializer = {"name": name, "Reg number": reg_no, "detail": "Deleted"}
        student.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication,]


    def get_queryset(self):
        # modified queryset to return a list of schedules belonging to the
        # logged in user.
        queryset = super().get_queryset()
        queryset = queryset.filter(staff=self.request.user.staff)
        return queryset


    def get_object(self):
        # Modified to return an instance of the logged in users schedule.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of two url kwargs [staff_id and instance id]
        obj = get_object_or_404(self.get_queryset(), staff__staff_id=self.request.user.staff.staff_id, id=self.kwargs["id"])
        
        # Make sure to check if the user has object level permission
        self.check_object_permissions(self.request, obj)
        return obj
    

    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

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

    def partial_update(self, request, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        schedule = self.get_object()
        staff, title = [schedule.staff.staff_id, schedule.title]
        serializer = {"staff id": staff, "title": title, "detail": "Deleted"}
        schedule.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)



class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireHyperlinkSerializer
    permission_classes = [permissions.IsAuthenticated&permissions.IsAdminUser]
    authentication_classes = [authentication.TokenAuthentication, BearerAuthentication, authentication.BasicAuthentication]

    def get_queryset(self):
        # return a list of questionnaire created by the logged in user
        queryset = super().get_queryset()
        queryset = queryset.filter(staff=self.request.user.staff)
        return queryset

    def get_object(self):
        # return an instance of a questionnaire for the logged in user and the specified id.
        # make sure to edit the hyperlink identity field on the serializer class to make use
        # of two url kwargs [staff_id and intance id]
        obj = get_object_or_404(super().get_queryset(), staff__staff_id=self.request.user.staff.staff_id, id=self.kwargs["id"])

        # make sure to check for object level permissions
        self.check_object_permissions(self.request, obj)
        return obj


    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request":  request})

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(), data=request.data, context={"request": request}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # else
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        question = self.get_object()
        q_id, q_title, q_created, q_completed = [question.id, question.title, question.created, question.completed]
        serializer = {"id": q_id, "title": q_title, "created": q_created, "completed": q_completed, "detail": "Deleted"}
        question.delete()
        return Response(data=serializer, status=status.HTTP_204_NO_CONTENT)