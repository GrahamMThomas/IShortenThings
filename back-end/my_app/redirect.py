import simplejson
import random
import string

REDIRECT_ID_LEN = 8


class Redirect:
    def __init__(self, dynamo_table, redirect_id):
        self.dynamo_table = dynamo_table
        self.redirect_id = redirect_id
        self.password = None
        self.item = self.get_dynamo_entry()

    @classmethod
    def create_redirect(cls, dynamo_table, url, uses_left=10, can_rickroll=False, password=None):
        """Creates a redirect entry

        Args:
            dynamo_table (boto3.dynamodb.table): Table to add redirect to
            url (string): url to redirect to
            uses_left (int, optional): How many uses remaining on redirect. Defaults to 10.
            can_rickroll (bool, optional): Does this redirect have a chance to rickroll you? Defaults to False.

        Returns:
            string: redirect_id of length REDIRECT_ID_LEN
        """
        redirect_id = cls._generate_redirect_id()
        dynamo_table.put_item(
            Item={
                "redirect_id": redirect_id,
                "uses_left": uses_left,
                "can_rickroll": can_rickroll,
                "url": url,
                "password": password,
            }
        )
        return redirect_id

    @staticmethod
    def _generate_redirect_id():
        letters_and_digits = string.ascii_letters + string.digits
        result_str = "".join((random.choice(letters_and_digits) for i in range(REDIRECT_ID_LEN)))
        return result_str

    def exists(self):
        return not self.item is None

    def is_password_protected(self):
        return not self.password is None

    def to_json(self):
        return simplejson.dumps(self.item)

    def get_dynamo_entry(self):
        """Pulls dynamo item from the table and saves it to instance var. Also sets Password.

        Returns:
            dict: item attributes related to redirect_id (excluding "password")
        """
        # TODO Single responsibility. Set password somewhere else
        item = self.dynamo_table.get_item(Key={"redirect_id": self.redirect_id}).get("Item")
        if item:
            self.password = item.pop("password", None)
        return item

    def spend_a_use(self):
        if self.exists() and self.item.get("uses_left") >= 1:
            self.dynamo_table.update_item(
                Key={"redirect_id": self.redirect_id},
                UpdateExpression="set uses_left=:x",
                ExpressionAttributeValues={":x": self.item.get("uses_left") - 1},
            )
            self.item["uses_left"] -= 1

        elif self.exists() and self.item.get("uses_left") <= 0:
            self.delete()

    def delete(self):
        self.dynamo_table.delete_item(Key={"redirect_id": self.redirect_id})
        self.item = None
