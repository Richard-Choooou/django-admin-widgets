# 该文件是自动生成，请勿修改
from django.urls import path
import dwc.views as views

app_name = 'components'
urlpatterns = [
    path('', views.index_view, name="index"),
    path('icon_picker', views.icon_picker_view, name="icon_picker"),
    path('uploader', views.uploader_view, name="uploader"),
]

