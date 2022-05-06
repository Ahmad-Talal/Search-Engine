from django.urls import path
from base.views import cookie_views as views

urlpatterns=[    
    path('create/',views.createUser,name='user'),  
]


