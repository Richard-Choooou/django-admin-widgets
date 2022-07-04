exports.view = `# 该文件是自动生成，请勿修改
from django.shortcuts import render

components = {{{componentsListStr}}}


def index_view(request):
    return render(request, 'preview/base.html', {
        "components": components
    })

{{#each components}}

def {{name}}_view(request):
    return render(request, 'preview/{{name}}/doc.html', {
        "components": components,
        "component": '{{name}}'
    })

{{/each}}
    
`

exports.urls = `# 该文件是自动生成，请勿修改
from django.urls import path
import dwc.views as views

app_name = 'components'
urlpatterns = [
    path('', views.index_view, name="index"),
    {{#each components}}
    path('{{name}}', views.{{name}}_view, name="{{name}}"),
    {{/each}}
]

`

exports.widgetPackage = `{{#each components}}
from {{name}} import {{className}}
{{/each}}

__all__ = [
    {{#each components}}
    '{{className}}',
    {{/each}}
]
`