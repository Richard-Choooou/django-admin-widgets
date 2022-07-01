from django.apps import AppConfig as BaseAppConfig


class AppConfig(BaseAppConfig):
    name = 'dwc'
    # verbose_name = '培训考核'

    def ready(self):
        super(AppConfig, self).ready()
