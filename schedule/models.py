from django.db import models

# Create your models here.

class EventList(models.Model):
    eventname = models.CharField(max_length=50)
    eventdate = models.CharField(max_length=50)
    predtime = models.CharField(max_length=50)
    emerge = models.CharField(max_length=50)

    def __str__(self):
        return self.eventname, self.eventdate, self.predtime, self.emerge

class ComEventList(models.Model):
    eventname = models.CharField(max_length=50)
    eventdate = models.CharField(max_length=50)
    predtime = models.CharField(max_length=50)
    emerge = models.CharField(max_length=50)
    costtime = models.CharField(max_length=50)

    def __str__(self):
        return self.eventname, self.eventdate, self.predtime, self.emerge, self.costtime
