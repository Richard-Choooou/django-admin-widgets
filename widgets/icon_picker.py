from django import forms


class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.ce60548d.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.ce60548d.js','./dwc-components/js/icon_picker.ce60548d.js',)
        