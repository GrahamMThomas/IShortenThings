import validations


def test_is_url_validator():
    assert validations.is_url("https://api.google.com")
    assert validations.is_url("http://google.com")

    assert not validations.is_url("http://google")
    assert not validations.is_url("google.com")
    assert not validations.is_url("google")
    assert not validations.is_url("")
    assert not validations.is_url(None)
