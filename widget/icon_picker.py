from django import forms

class IconPicker(forms.TextInput):
    template_name = 'dwc/icon_picker.html'