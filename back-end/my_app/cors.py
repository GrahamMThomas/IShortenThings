import traceback
import json


def add_cors(func):
    def wrapper(*args, **kwargs):

        output = func(*args, **kwargs)
        if not output.get("headers"):
            output["headers"] = {}
        output["headers"]["Access-Control-Allow-Origin"] = "*"
        output["headers"]["Access-Control-Allow-Methods"] = "*"
        output["headers"]["Access-Control-Allow-Headers"] = "*"
        return output

    return wrapper
