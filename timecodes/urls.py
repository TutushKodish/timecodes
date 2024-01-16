from django.urls import path
from . import views
from timecodes import views as timecodesViews
urlpatterns = [        
    path('details/<str:category>/<int:pageId>/', timecodesViews.td, name="td"),
    path('delete/<int:pageId>/', timecodesViews.deleteCode, name="deleteCode"),
    path('search-api/', timecodesViews.search_api, name='search_api'),
]