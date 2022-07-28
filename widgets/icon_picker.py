from django import forms


class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.c5670f63.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.c5670f63.js','./dwc-components/js/icon_picker.c5670f63.js',)
        