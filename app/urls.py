import re

from django.conf import settings
from django.conf.urls import patterns, url, include

from urls_app import urlpatterns as app_urlpatterns

from .views.home import HomeView
from .views.static import StaticView

#
# Assets.
#
urlpatterns = patterns(
    '',
    url(r'^%s(?P<path>.*)$' % re.escape(settings.STATIC_URL.lstrip('/')),
        StaticView.as_view(),
        {
            'cache_forever': True,
            'insecure': True
        }
        )
)

urlpatterns += app_urlpatterns

#
# Home view is default. (HTML5 routing).
#
urlpatterns += patterns(
    '',
    url(r'^.*$', HomeView.as_view(), name='home'),
)
