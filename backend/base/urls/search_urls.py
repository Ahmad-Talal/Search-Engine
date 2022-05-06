from django.urls import path
from base.views import search_views as views

urlpatterns=[   
    path('create/<str:pk>/',views.createSearch,name='search'), 
    path('get/<str:pk>/',views.getSearches,name='search'),   
]


