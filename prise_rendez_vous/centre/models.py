from django.db import models

class Specialite(models.Model):
    nom = models.CharField(max_length=200, unique=True)


class Centre(models.Model):
    nom = models.CharField(max_length=250, unique=True)
    adresse = models.CharField(max_length=200)
    contact = models.CharField(max_length=20)
    specialites = models.ManyToManyField(Specialite)

class Medecin(models.Model):
    nom = models.CharField(max_length=200)
    specialite = models.ForeignKey(Specialite, on_delete=models.SET_NULL, null=True)
    centre = models.ForeignKey(Centre, on_delete=models.SET_NULL, null=True)

