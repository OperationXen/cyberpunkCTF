import graphene
from .challenges import ChallengeQuery
from .misc import CategoryQuery
from .flags import FlagQuery
from .hints import HintQuery


class CustomQuery(CategoryQuery, ChallengeQuery, FlagQuery, HintQuery):
    pass


ctfschema = graphene.Schema(query=CustomQuery)
