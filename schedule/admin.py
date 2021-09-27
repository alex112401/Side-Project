from django.contrib import admin
from .models import EventList
from .models import ComEventList


admin.site.register(EventList)
admin.site.register(ComEventList)
