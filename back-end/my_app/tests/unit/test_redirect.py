import pytest
from redirect import Redirect, REDIRECT_ID_LEN
from app import REDIRECTS_TABLE


class TestCreate:
    def teardown(self):
        if self.redirect_id:
            Redirect(REDIRECTS_TABLE, self.redirect_id).delete()

    def test_create_redirect(self):
        try:
            redirect_id = Redirect.create_redirect(REDIRECTS_TABLE, "https://google.com")
            self.redirect_id = redirect_id
            assert len(redirect_id) == REDIRECT_ID_LEN
            assert Redirect(REDIRECTS_TABLE, redirect_id).exists()
        except:
            assert False, "Create redirect without erroring"


class TestDelete:
    def setup(self):
        self.redirect_id = Redirect.create_redirect(REDIRECTS_TABLE, "https://google.com")

    def teardown(self):
        if self.redirect_id:
            Redirect(REDIRECTS_TABLE, self.redirect_id).delete()

    def test_delete_redirect(self):
        try:
            Redirect(REDIRECTS_TABLE, self.redirect_id).delete()
            assert not Redirect(REDIRECTS_TABLE, self.redirect_id).exists()
        except:
            assert False, "Delete redirect without erroring"


class TestSpendUse:
    def setup(self):
        self.redirect_id = Redirect.create_redirect(REDIRECTS_TABLE, "https://google.com")

    def teardown(self):
        if self.redirect_id:
            Redirect(REDIRECTS_TABLE, self.redirect_id).delete()

    def test_spend_a_use(self):
        redirect = Redirect(REDIRECTS_TABLE, self.redirect_id)
        redirect.spend_a_use()
        assert redirect.item.get("uses_left") == 9

        # Check Dynamo updated
        assert Redirect(REDIRECTS_TABLE, self.redirect_id).item.get("uses_left") == 9

