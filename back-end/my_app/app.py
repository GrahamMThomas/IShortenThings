import json
import simplejson

import boto3
import re
import random
import string
from validations import is_url
from canned_responses import bad_request, NOT_FOUND
from exception_handler import handle_exceptions
from cors import add_cors

REDIRECTS_TABLE = boto3.resource("dynamodb", endpoint_url="http://dynamodb:8000").Table("Redirects")
REDIRECT_ID_LEN = 8


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

    # GET /<Alphanumeric>
    if re.match(rf"^[a-zA-Z0-9]{{{REDIRECT_ID_LEN},}}$", path) and event["httpMethod"] == "GET":
        redirect_id = re.match(rf"^([a-zA-Z0-9]{{{REDIRECT_ID_LEN},}})$", path).group(1)
        requested_redirect = REDIRECTS_TABLE.get_item(Key={"redirect_id": redirect_id}).get("Item")

        if requested_redirect and query_params.get("use") == "true":
            print("remove a use")
        # @todo Currently returning 200 no matter what. Not sure if I like this as it's not too clear
        return {
            "statusCode": 200,
            # Normal json library doesn't play nice with Decimals
            "body": simplejson.dumps({"redirect": requested_redirect}),
        }

    # POST /redirects
    if re.match(r"^redirects$", path) and event["httpMethod"] == "POST":
        print(body)
        url = body.get("url")
        if is_url(url):

            redirect_id = create_redirect(url)
            return {
                "statusCode": 200,
                "body": json.dumps({"redirect_id": redirect_id}),
            }
        else:
            return bad_request(["url"])

    return NOT_FOUND


# https://stackoverflow.com/questions/1960516/python-json-serialize-a-decimal-object
class DecimalEncoder(json.JSONEncoder):
    def _iterencode(self, o, markers=None):
        if isinstance(o, decimal.Decimal):
            return (str(o) for o in [o])
        return super(DecimalEncoder, self)._iterencode(o, markers)


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
            "url": url,
        }
    )
    return redirect_id


def generate_redirect_id():
    letters_and_digits = string.ascii_letters + string.digits
    result_str = "".join((random.choice(letters_and_digits) for i in range(REDIRECT_ID_LEN)))
    return result_str
