from django.apps import AppConfig as BaseAppConfig


class AppConfig(BaseAppConfig):
    name = 'dwc'
    verbose_name = 'dwc'

    def ready(self):
        super(AppConfig, self).ready()
