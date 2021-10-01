from django import forms
from .models import EventList, ComEventList

class EventListModelForm(forms.ModelForm):
  class Meta: 
    model = EventList
    fields = '__all__'

class ComEventListModelForm(forms.ModelForm):
  class Meta: 
    model = ComEventList
    fields = '__all__'