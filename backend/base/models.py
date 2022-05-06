from django.db import models

# Create your models here.
class Cookie(models.Model):
    nothing=models.CharField(max_length=25,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self._id)

class Search(models.Model):
    cookie=models.ForeignKey(Cookie, on_delete=models.SET_NULL,null=True)
    search=models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.search