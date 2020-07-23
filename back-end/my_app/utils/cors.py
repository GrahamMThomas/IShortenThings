import traceback
import json
import logging
import os


def add_cors(func):
    def wrapper(*args, **kwargs):
        allowed_domains = [
            "https://master.d2t1c4oka9hdou.amplifyapp.com",
            "https://app.ishortenthings.com",
            "http://localhost:3000",  # Local
            "http://localhost",  # Test
        ]

        # https://github.com/awslabs/aws-sam-cli/issues/1860
        origin = None
        if os.environ.get("EnvName", "test") in ["preprod", "prod"]:
            origin = args[0].get("headers", {}).get("origin")
        else:
            origin = args[0].get("headers", {}).get("Origin")

        output = func(*args, **kwargs)
        if not output.get("headers"):
            output["headers"] = {}
        if origin in allowed_domains:
            output["headers"]["Access-Control-Allow-Origin"] = origin
        else:
            output["headers"]["Access-Control-Allow-Origin"] = None
            logging.error(f"CORS error detected. Origin: {origin}")

        output["headers"]["Access-Control-Allow-Methods"] = "POST,GET,OPTIONS"
        output["headers"]["Access-Control-Allow-Headers"] = "*"
        return output

    return wrapper
