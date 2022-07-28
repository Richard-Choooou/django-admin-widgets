# 该文件是自动生成，请勿修改
from django.shortcuts import render

components = [
    {
        "name": "icon_picker",
        "cname": "图标选择",
        "className": "IconPicker"
    },
    {
        "name": "rich_text",
        "cname": "富文本",
        "className": "RichText"
    },
    {
        "name": "uploader",
        "cname": "文件上传",
        "className": "Uploader"
    }
]


def index_view(request):
    return render(request, 'doc/base.html', {
        "components": components
    })


def icon_picker_view(request):
    return render(request, 'doc/icon_picker/doc.html', {
        "components": components,
        "component": 'icon_picker'
    })


def rich_text_view(request):
    return render(request, 'preview/rich_text/doc.html', {
        "components": components,
        "component": 'rich_text'
    })


def uploader_view(request):
    return render(request, 'doc/uploader/doc.html', {
        "components": components,
        "component": 'uploader'
    })

    
