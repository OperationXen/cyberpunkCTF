import graphene
from graphene_django.types import DjangoObjectType
from core.models.flags import BaseFlag
from core.models.challenges import Solve
from core.processors import process_submission


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
class SubmissionResultType(DjangoObjectType):
    class Meta:
        model = Solve


class FlagSubmission(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        submission = graphene.String(required=True)

    result = graphene.Field(SubmissionResultType)

    def mutate(self, info, id, submission):
        solve = process_submission(id, submission, info.context.user)
        return FlagSubmission(result=solve)


class FlagMutations(graphene.ObjectType):
    submitflag = FlagSubmission.Field()
