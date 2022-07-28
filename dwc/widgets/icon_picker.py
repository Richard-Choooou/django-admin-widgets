from django import forms


class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.8f90288d.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.8f90288d.js','./dwc-components/js/icon_picker.8f90288d.js',)
        