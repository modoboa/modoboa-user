from django.apps import AppConfig


class ModoboaContactsConfig(AppConfig):
    name = "modoboa_user.contacts"

    def ready(self):
        from . import handlers
