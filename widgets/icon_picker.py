from django import forms


class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.826ea35c.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.826ea35c.js','./dwc-components/js/icon_picker.826ea35c.js',)
        