import os


def dynamodb_hostname():
    env_name = os.environ.get("EnvName", "test")
    if env_name == "dev":
        return "http://dynamodb:8000"
    elif env_name == "test":
        return "http://0.0.0.0:8000"
    else:
        raise ValueError(f"{env_name} not valid for dynamo hostname config")
