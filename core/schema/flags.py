import graphene
from graphene_django.types import DjangoObjectType
from core.models.flags import BaseFlag


class BaseFlagType(DjangoObjectType):
    """ GraphQL representation of the BaseFlag model """
    class Meta:
        model = BaseFlag


class FlagQuery(graphene.ObjectType):
    """ GraphQL queries for flags """
    all_flags = graphene.List(BaseFlagType)