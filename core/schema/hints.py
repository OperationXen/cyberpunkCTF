import graphene
from graphene_django.types import DjangoObjectType
from core.models.hints import Hint


class HintType(DjangoObjectType):
    """ GraphQL representation of the Hints model """
    class Meta:
        model = Hint


class HintQuery(graphene.ObjectType):
    """ GraphQL queries for hints """
    all_hints = graphene.List(HintType)
    hint = graphene.Field(HintType, id=graphene.Int())

    def resolve_all_hints(self, info, **kwargs):
        return Hint.objects.all()

    def resolve_hint(self, info, id, **kwargs):
        return Hint.objects.get(pk=id)
