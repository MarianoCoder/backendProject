import EnumsError from "./EnumsError.js"

export default (error, req, res, next)=>{
    console.log(error)
    switch (error.code){
        case EnumsError.INVALID_TYPES_ERROR:
            res.status(400).send({status: "error", message: error.name})
        break;
        case EnumsError.DATABASE_ERROR:
            res.status(500).send({status: "error", message: error.name})
        break;
        default:
        res.send({starus: "error", error: "Unhandled error"})
    }
}