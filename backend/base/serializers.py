from rest_framework import serializers
from .models import Cookie,Search


class CookieSerializer(serializers.ModelSerializer):
    class Meta:
        model= Cookie
        fields='__all__'

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model= Search
        fields='__all__'