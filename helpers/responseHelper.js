class ResponseHelper{
    static dataFoundResponse(res,docs){
        return res.status(200).json({
            message:"record found",
            statusCode:200,
            data:docs,
            error:null
        });

    }

    static dataNotFoundResponse(res){
        return res.status(200).json({
            message:"Record not found",
            statusCode:204,
            data:null,
            error:null
        });
    }

    static dataNotUpdatedResponse(res){
        return res.status(200).json({
            message:"Record updation unsuccessful",
            statusCode:204,
            data:null,
            error:null
        });
    }

    static dataUpdatedResponse(res,data){
        return res.status(200).json({
            message:"record updated successfully",
            statusCode:200,
            data:data,
            error:null
        });
    }

    static someThingWentWrongResponse(res,err){
        return res.status(200).json({
            message:"Some thing went wrong",
            statusCode:500,
            data:null,
            error:err
        });
    }

    static dataSavedResponse(res,data){
        return res.status(200).json({
            message:'data got saved successfully',
            statusCode:201,
            data:data,
            error:null
        });
    }
}
module.exports = ResponseHelper;