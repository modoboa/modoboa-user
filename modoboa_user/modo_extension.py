"""Declare and register the contacts extension."""

from django.utils.translation import gettext_lazy

from modoboa.core.extensions import ModoExtension, exts_pool
from modoboa.parameters import tools as param_tools

from modoboa_user.contacts.forms import UserSettings

from . import __version__


class UserApps(ModoExtension):
    """Plugin declaration."""

    name = "modoboa_user"
    label = gettext_lazy("User applications")
    version = __version__
    description = gettext_lazy("End-user oriented applications for Modoboa")
    url = "user"

    def get_available_apps(self):
        return [
            {
                "name": "contacts",
                "label": gettext_lazy("Contacts"),
                "icon": "mdi-contacts",
                "description": gettext_lazy("Address book"),
                "url": "/user/contacts"
            }
        ]

    def load(self):
        param_tools.registry.add(
            "user", UserSettings, gettext_lazy("Contacts")
        )


exts_pool.register_extension(UserApps)
