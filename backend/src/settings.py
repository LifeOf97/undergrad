from corsheaders.defaults import default_headers, default_methods
from pathlib import Path
import json, os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Get secure json files
secure_file = Path(BASE_DIR / 'src/config.json').read_text()
CONFIG = json.loads(secure_file)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
# Boolean value
DEBUG = False

ALLOWED_HOSTS = ["web-cgims.herokuapp.com",]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # my apps
    'careerguide.apps.CareerguideConfig',
    # 3rd party apps
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    "drf_spectacular",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'src.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'src.wsgi.application'

# My custom App user model
AUTH_USER_MODEL = 'careerguide.Profile'

# My custom auth backend
AUTHENTICATION_BACKENDS = [
    'careerguide.authentications.StaffAuthBackend',
    'django.contrib.auth.backends.ModelBackend'
]


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': "",
        'NAME': "",
        'USER': "",
        'PASSWORD': "",
        'HOST': "",
        'PORT': "",
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Lagos'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media/'


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


REST_FRAMEWORK = {
    # "DEFAULT_AUTHENTICATION_CLASSES"
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Django corsheaders settings
CORS_ALLOWED_ORIGINS = [
    "web-cgims.herokuapp.com"
]

CORS_ALLOW_METHODS = list(default_methods) + []
CORS_ALLOW_HEADERS = list(default_headers) + []
CSRF_TRUSTED_ORIGINS = [
    "web-cgims.herokuapp.com"
]
CORS_EXPOSE_HEADERS = []
CORS_REPLACE_HTTPS_REFERER = False
CORS_PREFLIGHT_MAX_AGE = 86400
CORS_ALLOW_CREDENTIALS = True

# drg_spectacular settings
SPECTACULAR_SETTINGS = {
    'TITLE': 'CGIMS API',
    'DESCRIPTION': 'Web-based Career Guidance Information Management System',
    'VERSION': '1.0.0',
    # OTHER SETTINGS
}