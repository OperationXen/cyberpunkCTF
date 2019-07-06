import graphene
from graphene_django.types import DjangoObjectType
from core.models.challenges import BaseChallenge


class ChallengeType(DjangoObjectType):
    """ GraphQL representation of the BasicChallenge model """
    class Meta:
        model = BaseChallenge


class ChallengeQuery(graphene.ObjectType):
    """ GraphQL queries for challenges """
    all_challenges = graphene.List(ChallengeType)

    def resolve_all_challenges(self, args):
        return BaseChallenge.objects.all()