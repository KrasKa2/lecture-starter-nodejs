const responseMiddleware = (err, req, res, next) => {
  if (err) {
    const { message, code = 401 } = err;
    res.status(code).send({ error: true, message });
  }
};

export { responseMiddleware };
