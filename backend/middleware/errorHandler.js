/**
 * Central error handler — returns consistent JSON for API consumers.
 */
export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be under 5MB' : err.message,
    });
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};
