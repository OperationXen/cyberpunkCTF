import graphene
from .challenges import ChallengeQuery
from .misc import CategoryQuery
from .flags import FlagQuery, FlagMutations
from .hints import HintQuery


class CustomQuery(CategoryQuery, ChallengeQuery, FlagQuery, HintQuery):
    pass


class CustomMutation(FlagMutations):
    pass


ctfschema = graphene.Schema(query=CustomQuery, mutation=CustomMutation)
