import graphene
from graphene_django.types import DjangoObjectType
from core.models.challenges import BaseChallenge


class ChallengeType(DjangoObjectType):
    """ GraphQL representation of the BasicChallenge model """
    solves = graphene.Int()
    points = graphene.Int()

    class Meta:
        model = BaseChallenge
        exclude_fields = ("hidden", "value_start", "value_soft_floor", "value_hard_floor", "number_solves_to_minimum")

    def resolve_solves(self, info):
        return 1337

    def resolve_points(self, info):
        return 100


class ChallengeQuery(graphene.ObjectType):
    """ GraphQL queries for challenges """
    all_challenges = graphene.List(ChallengeType, category=graphene.String())
    challenge = graphene.Field(ChallengeType, id=graphene.Int())

    def resolve_all_challenges(self, info, category=None, **kwargs):
        if not category:
            return BaseChallenge.objects.all()
        else:
            return BaseChallenge.objects.filter(category__title__iexact=category)

    def resolve_challenge(self, info, id, **kwargs):
        return BaseChallenge.objects.get(pk=id)
