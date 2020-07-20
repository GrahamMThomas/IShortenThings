import json

import pytest

import app
from tests.unit.apigw_helper import apigw_get, apigw_post


def test_not_found():
    ret = app.lambda_handler(apigw_get("DoesNotExist"), "")
    assert ret.get("statusCode") == 404


def test_redirect_create():
    request = apigw_post("redirects", body={"url": "https://google.com"})
    ret = app.lambda_handler(request, "")
    assert ret.get("statusCode") == 200

