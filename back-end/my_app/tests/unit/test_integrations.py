import json

import pytest

import app
from tests.unit.apigw_helper import apigw_get, apigw_post

from redirect import Redirect


def test_not_found():
    res = app.lambda_handler(apigw_get("DoesNotExist"), "")
    assert res.get("statusCode") == 404


class TestCreateRedirect:
    def teardown(self):
        if self.redirect_id:
            Redirect(app.REDIRECTS_TABLE, self.redirect_id).delete()

    def test_redirect_create(self):
        request = apigw_post("redirects", body={"url": "https://google.com"})
        res = app.lambda_handler(request, "")

        assert res.get("statusCode") == 200

        redirect_id = json.loads(res.get("body", "{}")).get("redirect_id", None)
        self.redirect_id = redirect_id
        assert redirect_id is not None

        redirect_entry = Redirect(app.REDIRECTS_TABLE, redirect_id)
        assert redirect_entry.exists()


class TestRetrieveRedirect:
    def setup(self):
        self.redirect_id = Redirect.create_redirect(app.REDIRECTS_TABLE, "https://google.com")

    def teardown(self):
        if self.redirect_id:
            Redirect(app.REDIRECTS_TABLE, self.redirect_id).delete()

    def test_retrieve_redirect(self):
        request = apigw_get(f"redirects/{self.redirect_id}")
        res = app.lambda_handler(request, "")

        assert res.get("statusCode") == 200
        assert (
            json.loads(res.get("body", {})).get("redirect", {}).get("redirect_id")
            == self.redirect_id
        )

    def test_redirect_usage(self):
        request = apigw_get(f"redirects/{self.redirect_id}", {"use": "true"})
        res = app.lambda_handler(request, "")

        assert res.get("statusCode") == 200
        assert json.loads(res.get("body", {})).get("redirect", {}).get("uses_left") == 9


def test_create_bad_request():
    request = apigw_post("redirects", body={"foo": "bar"})
    res = app.lambda_handler(request, "")

    assert res.get("statusCode") == 400

