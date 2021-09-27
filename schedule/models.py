from django.db import models

# Create your models here.

class EventList(models.Model):
    eventname = models.CharField(max_length=50, verbose_name='eventname')
    eventdate = models.CharField(max_length=50, verbose_name='eventdate')
    predtime = models.FloatField(max_length=50, verbose_name='predtime')
    emerge = models.CharField(max_length=50, verbose_name='emerge')

    def __str__(self):
        return '%s %s %s %s'%(self.eventname, self.eventdate, self.predtime, self.emerge)

class ComEventList(models.Model):
    eventname = models.CharField(max_length=50, verbose_name='eventname')
    eventdate = models.CharField(max_length=50, verbose_name='eventdate')
    predtime = models.FloatField(max_length=50, verbose_name='predtime')
    emerge = models.CharField(max_length=50, verbose_name='emerge')
    costtime = models.FloatField(max_length=50, verbose_name='costtime')

    def __str__(self):
        return '%s %s %s %s %s'%(self.eventname, self.eventdate, self.predtime, self.emerge, self.costtime)
