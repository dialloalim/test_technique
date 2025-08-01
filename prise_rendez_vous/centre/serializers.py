from rest_framework.serializers import ModelSerializer, SerializerMethodField, ValidationError
from rest_framework import serializers
from centre.models import Centre, Specialite, Medecin


class SpecialiteSerializer(ModelSerializer):
    class Meta:
        model = Specialite
        fields = ['id', 'nom']
        
    # def validate_nom(self, value):
    #     if Specialite.objects.filter(nom=value).exists():
    #         raise  ValidationError(f"La spécialité {value} existe deja")


class CentreSerializer(ModelSerializer):
    liste_specialites = SerializerMethodField()
    class Meta:
        model = Centre
        fields = ['id', 'adresse', 'nom', 'contact', 'liste_specialites']

    def get_liste_specialites(self, obj):
        return SpecialiteSerializer(obj.specialites.all(), many=True).data
    
class CentreCreateSerializer(ModelSerializer):
    
    class Meta:
        model = Centre
        fields = ['id', 'adresse', 'nom', 'contact', 'specialites']

    
class MedecinSerializer(ModelSerializer):
    specialite = SpecialiteSerializer()
    #centre = CentreSerializer()
    
    class Meta:
        model = Medecin
        fields = ['id', 'nom', 'specialite']

    
class MedecinCreateSerializer(ModelSerializer):
    class Meta:
        model = Medecin
        fields = ['id', 'nom', 'centre', 'specialite']
   