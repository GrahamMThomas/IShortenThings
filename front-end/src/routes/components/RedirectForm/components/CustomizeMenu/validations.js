const validPassword = (password) => {
  var pattern = new RegExp("^[a-zA-Z0-9]+$", "i"); // fragment locator
  return !!pattern.test(password);
};

export { validPassword };
