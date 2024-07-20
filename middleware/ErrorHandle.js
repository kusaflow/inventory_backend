/**
 * Middleware to check errors.
 * @returns Middleware function.
 */

const errorHandler = (err, req, res, next) => {
    console.log(err.stack.red);
    
    switch(err.statusCode){
        case 400:
            res.status(400).json({
                title : "Bad Request, validation error",
                success: false,
                error: err.stack ,
            });
            break;
        case 401:
            res.status(401).json({
                title : "Unauthorized",
                success: false,
                error: err.stack ,
            });
            break;
        case 404:
            res.status(404).json({
                title : "not found",
                success: false,
                error: err.stack ,
            });
            break;
        case 500:
            res.status(500).json({
                title : "not found",
                success: false,
                error: err.stack ,
            });
            break;
    }
    
}; 

module.exports = errorHandler;