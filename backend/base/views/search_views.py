from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from base.models import Cookie,Search
from base.serializers import SearchSerializer 

@api_view(['POST'])
def createSearch(request,pk):
        data = request.data
        cook = Cookie.objects.get(_id=pk)
        try:
            s = Search.objects.create(
                cookie = cook,
                search = data['search']
            )
            serializer= SearchSerializer(s,many=False)
            return Response(serializer.data)    
        except:
            return Response({'detail':'Search could not be searched!'},
                status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getSearches(request,pk):
    try:
        searchTables = Search.objects.all()
        searches = []
        for tables in searchTables:
            if tables.cookie._id == int(pk):
                searches.append(tables)
        serializer = SearchSerializer(searches,many=True)
        return Response(serializer.data)
    except:
            return Response([])