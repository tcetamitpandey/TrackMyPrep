



export default function Error_Handler(err, req, res, next){

    console.error(err)

    const status_code = err.status || 500

    const error_msg = status_code === 500 ? "Internal Server Error " : err.message

    res.status(status_code).json({
        "success" : "Failed",
        "Error": error_msg })
}