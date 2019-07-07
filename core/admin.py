from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models.users import CTFUser, Team
from .models.misc import Category, Tag
from .models.hints import Hint
from .models.flags import BaseFlag
from .models.challenges import BaseChallenge, Solve
from .models.announcements import Announcement


# User control and game flow
admin.site.register(CTFUser, UserAdmin)
admin.site.register(Team)

# Challenges, flags, etc
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(BaseChallenge)
admin.site.register(BaseFlag)
admin.site.register(Solve)
admin.site.register(Hint)

# Misc - communications, etc
admin.site.register(Announcement)