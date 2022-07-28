from django import forms


class RichText(forms.TextInput):
    template_name = 'dwc/richtext.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.c5670f63.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.c5670f63.js','./dwc-components/js/rich_text.c5670f63.js',)
        