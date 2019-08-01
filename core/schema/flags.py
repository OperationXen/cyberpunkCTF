import graphene
from graphene_django.types import DjangoObjectType
from core.models.flags import BaseFlag


class BaseFlagType(DjangoObjectType):
    """ GraphQL representation of the BaseFlag model """
    class Meta:
        model = BaseFlag
        exclude_fields = ("value", "exact", "regex")


class FlagQuery(graphene.ObjectType):
    """ GraphQL queries for flags """
    all_flags = graphene.List(BaseFlagType)
    flag = graphene.Field(BaseFlagType, id=graphene.Int())

    def resolve_all_flags(self, info, **kwargs):
        return BaseFlag.objects.all()

    def resolve_flag(self, info, id, **kwargs):
        return BaseFlag.objects.get(pk=id)
# #################################################################################################################### #


class FlagSubmission(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        submission = graphene.String(required=True)

    correct = graphene.Boolean()

    def mutate(self, info, id, submission):
        return FlagSubmission(correct=False)


class FlagMutations(graphene.ObjectType):
    submitflag = FlagSubmission.Field()
