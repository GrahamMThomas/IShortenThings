import json
import boto3
import re
import random
import string
from validations import is_url
from canned_responses import bad_request
from exception_handler import handle_exceptions

REDIRECTS_TABLE = boto3.resource("dynamodb", endpoint_url="http://dynamodb:8000").Table(
    "Redirects"
)
REDIRECT_ID_LEN = 8


@handle_exceptions
def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """
    path = event["pathParameters"]["proxy"]
    body = json.loads(event["body"])

    if re.match(r"^redirects$", path) and event["httpMethod"] == "POST":
        url = body.get("url")
        if is_url(url):

            redirect_id = create_redirect(url)
            return {
                "statusCode": 200,
                "body": json.dumps({"redirect_id": redirect_id}),
            }
        else:
            return bad_request(["url"])

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "hello world",}),
    }


def create_redirect(url, uses_left=10, user_token="None", can_rickroll=False):
    """Creates a redirect entry

    Args:
        url (string): url to redirect to
        uses_left (int, optional): How many uses remaining on redirect. Defaults to 10.
        user_token (str, optional): Which users owns this redirect. Defaults to "None".
        can_rickroll (bool, optional): Does this redirect have a chance to rickroll you? Defaults to False.

    Returns:
        string: redirect_id of length REDIRECT_ID_LEN
    """
    redirect_id = generate_redirect_id()
    REDIRECTS_TABLE.put_item(
        Item={
            "redirect_id": redirect_id,
            "uses_left": uses_left,
            "user_token": user_token,
            "can_rickroll": can_rickroll,
        }
    )
    return redirect_id


def generate_redirect_id():
    letters_and_digits = string.ascii_letters + string.digits
    result_str = "".join(
        (random.choice(letters_and_digits) for i in range(REDIRECT_ID_LEN))
    )
    return result_str
