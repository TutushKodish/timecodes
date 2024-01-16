from django.db import models

# Create your models here.
class Timecode(models.Model):
	category = models.CharField(max_length=30, default="")
	pageId = models.AutoField(primary_key=True)
	date = models.DateField()
	title = models.CharField(max_length=100)
	codes = models.TextField(default="")
	image = models.ImageField(upload_to='timecodes/static', blank=True, null=True)
	urlImage = models.URLField(blank=True, null=True)
	video = models.CharField(max_length=100, default=100)