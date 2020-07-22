from utils.validations import is_url


def test_is_url_validator():
    assert is_url("https://api.google.com")
    assert is_url("http://google.com")

    assert not is_url("http://google")
    assert not is_url("google.com")
    assert not is_url("google")
    assert not is_url("")
    assert not is_url(None)
