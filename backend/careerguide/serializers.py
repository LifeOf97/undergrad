from .models import Staff, Student, Schedule, Questionnaire, Observation
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers, validators
from django.contrib.auth import get_user_model
from . import others


Profile = get_user_model()

# create serializers here
class ProfileHyperlinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        exclude = ("user_permissions", "groups", "date_joined", "is_superuser", "is_active")
        extra_kwargs = {
            # change the viewname of the url instance identity field
            "url": {"view_name": "careerguide:profile-detail", "lookup_field": "id"},
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        # pop the password field
        password = validated_data.pop("password")

        # create a new user
        profile = Profile.objects.create(**validated_data)
        profile.set_password(password)
        profile.save()
        return profile


class StaffHyperLinkSerializer(serializers.HyperlinkedModelSerializer):
    # nested relationship
    profile = ProfileHyperlinkSerializer()

    class Meta:
        model = Staff
        fields = ("id", "staff_id", "url", "level", "profile")
        extra_kwargs = {
            "url": {"view_name": "careerguide:staff-detail", "lookup_field": "staff_id"},
        }


    def validate_staff_id(self, value):
        # Validate the staff id field
        if (len(value) == 7) and (value[:3].lower() == 'stf') and (value[3:].isnumeric()):
            return value.upper()
        else:
            raise serializers.ValidationError(_("Incorrect staff id!"))

    def create(self, validated_data):
        # A new profile object has to be created first, because the staff model
        # has a one-to-one relationship to the Profile (user) model which houses
        # the default django auth backend. Get the profile data and password
        profile_data = validated_data.pop("profile")
        password = profile_data.pop("password")

        profile = Profile.objects.create(**profile_data)
        profile.set_password(password)
        profile.is_staff = True
        profile.save()

        # after the profile has been created, create the staff instance
        staff = Staff.objects.create(profile=profile, **validated_data)
        return staff

    def update(self, instance, validated_data):
        # get the profile field
        profile_data = validated_data.pop("profile")
        # staff profile instance
        profile = instance.profile

        # update the staff fields and save
        instance.staff_id = validated_data.get("staff_id", instance.staff_id)
        instance.level = validated_data.get("level", instance.level)
        instance.save()

        # now update the staff profile fields
        profile.username = profile_data.get("username", profile.username)
        profile.first_name = profile_data.get("first_name", profile.first_name)
        profile.other_name = profile_data.get("other_name", profile.other_name)
        profile.last_name = profile_data.get("last_name", profile.last_name)
        profile.dob = profile_data.get("dob", profile.dob)
        profile.gender = profile_data.get("gender", profile.gender)
        profile.image = profile_data.get("image", profile.image)
        profile.about = profile_data.get("about", profile.about)
        profile.email = profile_data.get("email", profile.email)
        profile.phone_1 = profile_data.get("phone_1", profile.phone_1)
        profile.phone_2 = profile_data.get("phone_2", profile.phone_2)
        profile.country = profile_data.get("country", profile.country)
        profile.state = profile_data.get("state", profile.state)
        profile.postal = profile_data.get("postal", profile.postal)
        profile.save()

        return instance


class StudentHyperLinkSerializer(serializers.HyperlinkedModelSerializer):
    # identity field
    url = others.StudentHyperlinkIdentityField(view_name="careerguide:student-detail")
    # nested relationship
    profile = ProfileHyperlinkSerializer()

    class Meta:
        model = Student
        fields = ("id", "sid", "reg_no", "url", "level", "department", "parent", "profile")

        validators = [
            validators.UniqueTogetherValidator(
                queryset=Student.objects.all(),
                fields=["reg_no", "level", "department"],
                message=_("Student with this Reg no, level and department already exists.")
            ),
        ]

    def validate_reg_no(self, value):
        # Validate the student reg number id field
        if (len(value) == 4) and (value.isnumeric()):
            return value
        else:
            raise serializers.ValidationError(_("Incorrect registration number!"))

    def create(self, validated_data):
        # A new profile object has to be created first, because the student model
        # has a one-to-one relationship to the Profile (user) model which houses
        # the default django auth backend. Get the profile data and password
        profile_data = validated_data.pop("profile")
        profile_password = profile_data.pop("password")

        profile = Profile.objects.create(**profile_data)
        profile.set_password(profile_password)
        profile.is_staff = False
        profile.save()

        # after the profile has been created, create the student instance
        student = Student.objects.create(profile=profile, **validated_data)
        return student

    def update(self, instance, validated_data):
        # get the student profile field
        profile_data = validated_data.pop("profile")
        # student profile instance
        profile = instance.profile

        # update the student fields and save
        instance.reg_no = validated_data.get("reg_no", instance.reg_no)
        instance.level = validated_data.get("level", instance.level)
        instance.department = validated_data.get("department", instance.department)
        instance.parent = validated_data.get("parent", instance.parent)
        instance.save()

        # now update the student profile fields
        profile.username = profile_data.get("username", profile.username)
        profile.first_name = profile_data.get("first_name", profile.first_name)
        profile.last_name = profile_data.get("last_name", profile.last_name)
        profile.other_name = profile_data.get("other_name", profile.other_name)
        profile.dob = profile_data.get("dob", profile.dob)
        profile.gender = profile_data.get("gender", profile.gender)
        profile.image = profile_data.get("image", profile.image)
        profile.about = profile_data.get("about", profile.about)
        profile.email = profile_data.get("email", profile.email)
        profile.phone_1 = profile_data.get("phone_1", profile.phone_1)
        profile.phone_2 = profile_data.get("phone_2", profile.phone_2)
        profile.country = profile_data.get("country", profile.country)
        profile.state = profile_data.get("state", profile.state)
        profile.postal = profile_data.get("postal", profile.postal)
        profile.save()

        return instance


class ScheduleHyperlinkSerializer(serializers.HyperlinkedModelSerializer):
    # url identity field that links to staff instance that owns this schedule
    url = others.OthersToStaffHyperlinkIdentityField(view_name="careerguide:staff-schedule-detail")

    class Meta:
        model = Schedule
        fields = ("id", "url", "staff", "title", "slug", "detail", "created", "before", "completed")
        extra_kwargs = {
            "staff": {"view_name": "careerguide:staff-detail", "lookup_field": "staff_id", "read_only": True},
        }


class QuestionnaireHyperlinkSerializer(serializers.HyperlinkedModelSerializer):
    url = others.OthersToStaffHyperlinkIdentityField(view_name="careerguide:staff-questionnaire-detail")
    students = serializers.SlugRelatedField(queryset=Student.objects.all(), many=True, slug_field="profile_id")

    class Meta:
        model = Questionnaire
        fields = ("id", "url", "staff", "students", "categories", "created", "title", "slug", "question", "completed")
        extra_kwargs = {
            "staff": {"view_name": "careerguide:staff-detail", "lookup_field": "staff_id", "read_only": True},
        }


class ObservationHyperlinkSerializer(serializers.HyperlinkedModelSerializer):
    # url = others.OthersToStaffHyperlinkIdentityField(view_name="careerguide:staff-observation-detail")
    url  = others.StudentObservationHyperlinkIdentityField(view_name="careerguide:students-observation-detail")
    # student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    student = serializers.SlugRelatedField(queryset=Student.objects.all(), slug_field="sid")
    staff_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Observation
        fields = ("id", "url", "staff", "staff_id", "student", "detail", "created")
        extra_kwargs = {
            "staff": {"view_name": "careerguide:staff-detail", "lookup_field": "staff_id", "read_only": True},
            # "staff_id": {"read_only": True},
        }