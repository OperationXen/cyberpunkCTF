import graphene
from graphene_django.types import DjangoObjectType
from core.models.misc import Category


class CategoryType(DjangoObjectType):
    """ GraphQL representation of the Category model """
    class Meta:
        model = Category


class CategoryQuery(graphene.ObjectType):
    """ GraphQL queries for categories """
    all_categories = graphene.List(CategoryType)
    category = graphene.Field(CategoryType, id=graphene.Int())

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()

    def resolve_category(self, info, id, **kwaargs):
        return Category.object.get(pk=id)
