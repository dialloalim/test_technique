from datetime import datetime
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from centre.models import Centre, Medecin, Specialite
from centre.serializers import CentreCreateSerializer, CentreSerializer, MedecinCreateSerializer, SpecialiteSerializer, MedecinSerializer
from utils.paginations import DefaultPagination
from utils.constants import succes_key, message_key, errors_key

class SpecialiteAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        specialites = Specialite.objects.all()
        specialites = SpecialiteSerializer(specialites, many=True).data
        return Response({succes_key: True, "specialites": specialites})

    def post(self, request):
        
        serializer = SpecialiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({succes_key: True, message_key: "La spécialité a été enregistré avec succès", 'data': serializer.data})
        else:
            data = request.data 
            nom = data.get('nom')
            if Specialite.objects.filter(nom=nom).exists():
                return Response({succes_key: False, message_key: f"La spécialité {nom} existe deja"})

            return Response({succes_key: False, message_key: "Les donnees ne sont pas valides"})
        


class CentreAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        centres = Centre.objects.all()

        query = request.GET.get('query')
        if query:
            centres = centres.filter(nom__icontains=query)
        centres = CentreSerializer(centres, many=True).data
        return Response({succes_key: True, "centres": centres})
    
    def post(self, request):
        data = request.data 
        serializer = CentreCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({succes_key: True, message_key: "Le cenre a été enregistré avec succès"})
        else:
            data = request.data 
            nom = data.get('nom')
            if Centre.objects.filter(nom=nom).exists():
                return Response({succes_key: False, message_key: f"Le centre {nom} existe deja"})

            return Response({succes_key: False, message_key: "Les donnees ne sont pas valides", errors_key: serializer.errors})




class CentreUpdateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, centre_id):
        data = request.data 
        nom = data.get('nom')
        adresse = data.get('adresse')
        contact = data.get('contact')
        specialites = data.get('specialites')

        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: f"Ce centre n'est pas enregistre"})

        if Centre.objects.filter(nom=nom).exclude(id=centre_id):
            return Response({succes_key: False, message_key: f"Le centre {nom} est deja enregistre"})

        specialites = Specialite.objects.filter(id__in=specialites)
        centre = Centre.objects.get(id=centre_id)
        centre.nom = nom 
        centre.adresse = adresse
        centre.contact = contact
        centre.specialites.set(specialites)
        centre.save()
        return Response({succes_key: True, message_key: f"Le centre a ete modifie avec succes"})

            
class CentreGetAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, centre_id):
        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        centre = Centre.objects.get(id=centre_id)
        
        return Response({succes_key: True, "centre": CentreSerializer(centre).data})

class CentreSpecialiteAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, centre_id):
        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        centre = Centre.objects.get(id=centre_id)
        specialites = SpecialiteSerializer(centre.specialites.all(), many=True).data
        
        return Response({succes_key: True, "specialites": specialites})


    def post(self, request, centre_id):
        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        specialite = request.data.get('specialite')
        if not Specialite.objects.filter(id=specialite).exists():
            return Response({succes_key: False, message_key: "Cette specialite n'est pas enregistre"})

        centre = Centre.objects.get(id=centre_id)
        if centre.specialites.filter(id=specialite).exists():
            return Response({succes_key: False, message_key: "Cette specialite est deja ajoute a ce centre"})
        
        specialite = Specialite.objects.get(id=specialite)
        centre.specialites.add(specialite)
        
        return Response({succes_key: True, message_key: f"La specialite {specialite.nom} a ete ajoute avec succes"})


class CentreGetMedecinAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, centre_id):
        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        centre = Centre.objects.get(id=centre_id)
        medecins = Medecin.objects.filter(centre=centre)

        specialite_id = request.GET.get("specialite_id")
        if specialite_id:
            if not centre.specialites.filter(id=specialite_id).exists():
                return Response({succes_key: False, message_key: "Cette specialite n'est pas ajoutee a ce centre"})
            else:
               medecins = medecins.filter(specialite__id=specialite_id)

        medecins = MedecinSerializer(medecins, many=True).data
        
        return Response({succes_key: True, "medecins": medecins})

class CentreGetMedecinSpecialiteAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, centre_id, specialite_id):
        if not Centre.objects.filter(id=centre_id).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        centre = Centre.objects.get(id=centre_id)
        if not centre.specialites.filter(id=specialite_id).exists():
            return Response({succes_key: False, message_key: "Cette specialite n'est pas ajoutee a ce centre"})
        
        medecins = Medecin.objects.filter(centre=centre, specialite__id=specialite_id)
        medecins = MedecinSerializer(medecins, many=True).data
        
        return Response({succes_key: True, "medecins": medecins})
    
    
class MedecinAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        data_key = 'centres'
        centres = Centre.objects.all()
        paginatore = DefaultPagination(request, data_key, CentreSerializer, page_size=2)
        reponse = paginatore.get_reponse(centres)
        reponse[succes_key] = True
        
        return Response(reponse)
    
    def post(self, request):
        
        serializer = MedecinCreateSerializer(data=request.data)
        data = request.data
        nom = data.get('nom')
        centre = data.get('centre')
        specialite = data.get('specialite')

        if not Centre.objects.filter(id=centre).exists():
            return Response({succes_key: False, message_key: "Ce centre n'est pas enregistre"})
        
        centre = Centre.objects.get(id=centre)
        if not centre.specialites.filter(id=specialite).exists():
            return Response({succes_key: False, message_key: "Cette specialite n'est pas ajoutee a ce centre"})
        
        if serializer.is_valid():
            serializer.save()
            return Response({succes_key: True, message_key: "Le medecin a été enregistré avec succès"})
        else:
            return Response({succes_key: False, errors_key: serializer.errors})

    
