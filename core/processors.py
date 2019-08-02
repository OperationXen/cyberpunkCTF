from core.models.challenges import Solve
from core.models.flags import BaseFlag

def check_submission(flag, submitted_flag):
    return False

def current_solve_count(flag):
    valid_solves = Solve.objects.filter(flag=flag, correct=True)
    return valid_solves.count()


def determine_flag_value(flag, solve_count):
    return 100

def process_submission(flag_id, submitted_flag, user):
    try:
        if user.is_anonymous:                                                                                         # submission from an unauthenticated user...
            user = None

        flag = BaseFlag.objects.get(pk=flag_id)                                                                         # get the flag object from its ID
        challenge = flag.challenge                                                                                      # the parent challenge object
        # check challenge not already scored for this team / user
        correct = check_submission(flag, submitted_flag)                                                                # is the submitted answer acceptable/
        if correct:
            previous_solves = current_solve_count(flag)                                                                 # how many people have successfully solved this?
            flag_value = determine_flag_value(flag, previous_solves)
        else:
            flag_value = 0

        solve = Solve.objects.create(flag=flag, challenge=challenge, attempt=submitted_flag, correct=correct, value=flag_value, user=user)
        return solve
    except (BaseFlag.DoesNotExist, ValueError) as exception:
        return None
