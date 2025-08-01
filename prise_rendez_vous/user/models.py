from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone


class UtilisateurManager(BaseUserManager):
    

    def create_user(self, username, password, **extra_fields):
        
        if not username:
            raise ValueError("Vous devez fournir le nom d'utilisateur")

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(username, password, **extra_fields)


class Utilisateur(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    nom = models.CharField(max_length=250)
    password_changed = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nom']
    objects = UtilisateurManager()

    def __str__(self):
        return f'{self.nom} > {self.username}'
    
