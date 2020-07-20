import json

import pytest

import app
from tests.unit.apigw_helper import apigw_get, apigw_post


def test_lambda_handler(mocker):
    ret = app.lambda_handler(apigw_get("DoesNotExist"), "")
    assert ret.get("statusCode") == 404

    # data = json.loads(ret["body"])

    # assert ret["statusCode"] == 200
    # assert "message" in ret["body"]
    # assert data["message"] == "hello world"
    # assert "location" in data.dict_keys()

