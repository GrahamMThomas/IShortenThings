import traceback
import json


def handle_exceptions(func):
    def wrapper(*args, **kwargs):
        try:
            output = func(*args, **kwargs)
            print(output)
            return output
        except Exception as e:
            traceback.print_exc(e)
            return {
                "statusCode": 500,
                "body": json.dumps({"message": e,}),
            }

    return wrapper
