/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res, _next) {
  console.log(`⚠️  404: ${req.method} ${req.originalUrl} not found`);
  res.status(404).json({
    error: {
      type: 'NOT_FOUND',
      code: '40400',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
}

/**
 * Global error handler
 */
function errorHandler(err, req, res, _next) {
  console.error('❌ Unhandled Error:', err.message);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      type: err.type || 'INTERNAL_ERROR',
      code: err.code || '50000',
      message: err.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}

module.exports = { notFoundHandler, errorHandler };
