from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.home),
    path('admin/', admin.site.urls),
    path('Load_EventList', views.Load_EventList),    
    path('Load_ComEventList', views.Load_ComEventList),    
    path('Save_EventList', views.Save_EventList),    
    path('Save_ComEventList', views.Save_ComEventList),    
]