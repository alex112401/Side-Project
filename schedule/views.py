from django.shortcuts import render
from .models import EventList, ComEventList
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy



# Create your views here.
def home(request):
  return render(request, 'EventControl.html')

class EventListCreate(CreateView):
    model = EventList
    fields = '__all__'

class EventListUpdate(UpdateView):
    model = EventList
    fields = '__all__'

class EventListDelete(DeleteView):
    model = EventList
    success_url = reverse_lazy('books')


class ComEventListCreate(CreateView):
    model = ComEventList
    fields = '__all__'

class ComEventListUpdate(UpdateView):
    model = ComEventList
    fields = '__all__'

class ComEventListDelete(DeleteView):
    model = ComEventList
    success_url = reverse_lazy('books')