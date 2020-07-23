import json
import random
import re

import boto3
import simplejson

from redirect import REDIRECT_ID_LEN, Redirect
from utils.app_config import dynamodb_hostname
from utils.canned_responses import NOT_FOUND, bad_request
from utils.cors import add_cors
from utils.exception_handler import handle_exceptions
from utils.validations import is_url

REDIRECTS_TABLE = boto3.resource("dynamodb", endpoint_url=dynamodb_hostname()).Table("Redirects")
RICKROLL_CHANCE = 15


@handle_exceptions
@add_cors
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
    body = json.loads(event.get("body") if event.get("body") else "{}")
    query_params = event.get("queryStringParameters")

    # https://github.com/awslabs/aws-sam-cli/issues/1860
    event["headers"].update({name.lower(): value for name, value in event["headers"].items()})
    headers = event.get("headers")

    # GET /redirects/<Alphanumeric>
    regex = rf"^redirects/([a-zA-Z0-9]{{{REDIRECT_ID_LEN},}})$"
    if re.match(regex, path) and event["httpMethod"] == "GET":
        redirect_id = re.match(regex, path).group(1)
        requested_redirect = Redirect(REDIRECTS_TABLE, redirect_id)

        if not requested_redirect.exists():
            return NOT_FOUND

        if requested_redirect.is_password_protected():
            if query_params.get("pass", None) != requested_redirect.password:
                return {
                    "statusCode": 401,
                    "body": json.dumps({"message": "This direct requires a pass query parameter"}),
                }

        if query_params.get("use") == "true":
            requested_redirect.spend_a_use()

        response = {"redirect": requested_redirect.item}

        # Seed off combination of redirectid and user token so user gets same result every time
        if headers.get("user-token") and query_params.get("use") == "true":
            random.seed(f"{redirect_id}{headers.get('user-token')}")
            response["rickrolled"] = random.randint(1, 100) < RICKROLL_CHANCE

        return {
            "statusCode": 200,
            "body": simplejson.dumps(response),
        }

    # POST /redirects
    if re.match(r"^redirects$", path) and event["httpMethod"] == "POST":
        url = body.get("url")
        can_rickroll = body.get("can_rickroll")
        uses_left = body.get("uses_left", 10)
        password = body.get("password")

        if is_url(url):
            redirect_id = Redirect.create_redirect(
                REDIRECTS_TABLE,
                url,
                uses_left=uses_left,
                can_rickroll=can_rickroll,
                password=password,
            )
            return {
                "statusCode": 200,
                "body": json.dumps({"redirect_id": redirect_id}),
            }
        else:
            return bad_request(["url"])

    return NOT_FOUND
