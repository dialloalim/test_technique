
from django.contrib import admin
from django.urls import path
from centre.views import (CentreAPIView, 
                          SpecialiteCreateAPIView, 
                          MedecinAPIView, 
                          CentreSpecialiteAPIView, 
                          CentreGetMedecinSpecialiteAPIView,
                          CentreGetMedecinAPIView,
                          CentreGetAPIView
                          )

urlpatterns = [
    path('specialites/', SpecialiteCreateAPIView.as_view()),
    path('centres/', CentreAPIView.as_view()),
    path('centres/<int:centre_id>/', CentreGetAPIView.as_view()),
    path('centres/<int:centre_id>/specialites/', CentreSpecialiteAPIView.as_view()),
    path('centres/<int:centre_id>/medecins/', CentreGetMedecinAPIView.as_view()),
    path('medecins/', MedecinAPIView.as_view()),
    path('medecins/<int:centre_id>/<int:specialite_id>/', CentreGetMedecinSpecialiteAPIView.as_view()),
]
