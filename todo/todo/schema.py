import graphene
from graphene import String, Int, List, ID
from graphene_django import DjangoObjectType

from project.models import Todo, Project
from users.models import Users


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_project = graphene.List(ProjectType)
    all_users = graphene.List(UsersType)
    user_by_username = graphene.Field(UsersType, username=String(required=True))
    todo_delete = graphene.List(TodoType, id=Int(required=True))

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_user_by_username(self, info, username):
        try:
            return Users.objects.get(username=username)
        except Users.DoesNotExist:
            return None

    def resolve_todo_delete(self, info, id):
        try:
            todo = Todo.objects.get(id=id).delete()
        except Todo.DoesNotExist:
            return Todo.objects.all()
        return Todo.objects.all()


class ProjectMutation(graphene.Mutation):
    class Arguments:
        name_project = String(required=True)
        link_repo = String(required=True)
        users = List(String)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name_project, link_repo, users):
        project = Project.objects.create(name_project=name_project, link_repo=link_repo)
        project.users.set(users)
        return ProjectMutation(project=project)


class TodoMutation(graphene.Mutation):
    class Arguments:
        id = ID()
        text_todo = String()
        project = String()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id, text_todo=None, project=None):
        todo = Todo.objects.get(id=id)
        if text_todo:
            todo.text_todo = text_todo
        if project:
            todo.project = project
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    project_create = ProjectMutation.Field()
    todo_update = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
################################ Примеры запросов ###########################
# Получение всех TODO с названием проекта и фамилией и именем пользователей проекта
# {allTodo{id textTodo project{nameProject}user{firstName lastName}}}
# Получение пользователя по username
# {userByUsername(username:"nata"){id firstName lastName email}}
# Удаление TODO по id
# {todoDelete(id:6){textTodo}}
# создание проекта
# mutation projectCreate{projectCreate(nameProject: "lllljll",
# linkRepo: "http://127.0.0.1:8000/graphql/#query=k%7BprojectCreate(nameProject%3A%22llllll%22%2ClinkRepo%3A%22%22)%7B%7D%0A%0A%0A%0A",
#  users: ["1", "2", ]){project{nameProject linkRepo users{username}}}}
# Изменение TODO
# mutation todoUpdate{todoUpdate(id:8,textTodo:"new_text"){todo{textTodo}}}