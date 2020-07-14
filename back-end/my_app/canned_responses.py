import json


def bad_request(invalid=[]):
    return {
        "statusCode": 400,
        "body": json.dumps(
            {
                "message": f"Parameters {invalid if invalid else ''} are missing or invalid"
            }
        ),
    }
