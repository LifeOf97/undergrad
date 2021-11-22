from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    """
    Custom permission to only give users with superuser set to true
    the right to create new staff account.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        elif request.method == "POST":    
            return bool(
                request.user
                and request.user.is_authenticated
                and request.user.is_superuser
            )
        
        else:
            return bool(
                request.user
                and request.user.is_authenticated
            )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom object level permission to give read and write access to the
    owner of an account instance.
    """
    def has_object_permission(self, request, view, obj):
        # allow safe methods such as GET, POST and HEAD.
        if request.method in permissions.SAFE_METHODS:
            return True

        # else check if the requesting user is logged in and is the owner
        # of the object instance.
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.staff == obj
        )
