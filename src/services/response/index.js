`use strict`;


exports.notFound = (res, status, message) => (entity) =>  {
    if (entity){
        return entity
    }
    res.status(404, status, message).jsonp({
        code: status || 404,
        message: message || 'notFound'
    })
    return null
}

exports.success = (res, status, message) => (entity) => {
    if (entity.rows == null){
        return res.status(status || 200).jsonp({
            code: status || 200 ,
            message: message || 'success',
            payload: entity
        })
    }

    return res.status(status || 200).jsonp({
        code: status || 200 ,
        message: message || 'success',
        count: entity.count,
        perpage: entity.perpage,
        payload: entity.rows || entity
    })  
}

exports.badRequest = (res, status, message) => (entity) => {
    return res.status(400).jsonp({
        code: status || 400,
        message: entity || 'Bad Request'
    })
}

exports.unauthorized = (res) => {
    return res.status(401).jsonp({
        code: 401,
        message: 'unauthorized'
    })
}