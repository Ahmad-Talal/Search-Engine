from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.models import Cookie
from base.serializers import CookieSerializer 
@api_view(['POST'])
def createUser(request):
        try:
            cookie = Cookie.objects.create(
                nothing= ""
            )
            serializer= CookieSerializer(cookie,many=False)
            return Response(serializer.data)    
        except:
            return Response({'detail':'USer could not be created!'},
                status=status.HTTP_400_BAD_REQUEST)