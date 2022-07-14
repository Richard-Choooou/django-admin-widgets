from django import forms


class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'

    class Media:
        css = {
            'all': ('./dwc-components/css/dwc.min.530449c3.css',),
        }
        js = ('./dwc-components/js/dwc.chunks.min.530449c3.js','./dwc-components/js/icon_picker.530449c3.js',)
        