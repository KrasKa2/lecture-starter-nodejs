const responseMiddleware = (err, req, res, next) => {
  if (err) {
    const { message, code = 500 } = err;
    res.status(code).send({ error: true, message });
  }
};

export { responseMiddleware };
