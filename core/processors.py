from core.models.challenges import Solve
from core.models.flags import BaseFlag


def check_submission(flag, submitted_flag):
    """ Test the validity of a flag submission """
    if flag.exact:
        if submitted_flag == flag.value:
            return True
        elif flag.value in submitted_flag:
            return True
    return False


def current_solve_count(flag):
    """ Get the count of successful solves for a specific flag """
    valid_solves = Solve.objects.filter(challenge=flag.challenge).filter(correct=True)                                  # find all correct submission for the associtated challenge
    return valid_solves.count()


def determine_flag_value(flag, solve_count):
    """ Calculate the points value for a successful solve """
    value = flag.challenge.value_start
    decay_range = flag.challenge.value_start - flag.challenge.value_soft_floor

    decayed = decay_range / solve_count if solve_count else 0
    value = value - decayed
    return value


def process_submission(flag_id, submitted_flag, user):
    """ Handle the submission of a flag attempt, return a solve record """
    try:
        if user.is_anonymous:                                                                                           # submission from an unauthenticated user...
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
