import json

import pytest

import app
from tests.unit.apigw_helper import apigw_get, apigw_post

from redirect import Redirect


def test_not_found():
    ret = app.lambda_handler(apigw_get("DoesNotExist"), "")
    assert ret.get("statusCode") == 404


class TestCreateRedirect:
    def teardown(self):
        if self.redirect_id:
            Redirect(app.REDIRECTS_TABLE, self.redirect_id).delete()

    def test_redirect_create(self):
        request = apigw_post("redirects", body={"url": "https://google.com"})
        ret = app.lambda_handler(request, "")

        assert ret.get("statusCode") == 200

        redirect_id = json.loads(ret.get("body", "{}")).get("redirect_id", None)
        self.redirect_id = redirect_id
        assert redirect_id is not None

        redirect_entry = Redirect(app.REDIRECTS_TABLE, redirect_id)
        assert redirect_entry.item is not None

