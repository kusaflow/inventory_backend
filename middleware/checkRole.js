/**
 * Middleware to check user's role against allowed roles.
 * @param {Array} allowedRoles - An array of strings representing the allowed roles.
 * @returns Middleware function.
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).send({ message: 'User is not authenticated', user : req.user });
      }
  
      // Check if the user's role is one of the allowed roles
      const { role } = req.user;
      if (allowedRoles.includes(role)) {
        next();
      } else {
        res.status(403).send({ message: 'Insufficient permissions to access this resource' });
      }
    };
  };
  
  module.exports = checkRole;
  