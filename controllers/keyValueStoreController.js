const keyValueStoreModel = require('../models/keyValueStoreModel');
const responseHelper = require('../helpers/responseHelper');

//handler for the get key value request along with timestamp
module.exports.getKeyValue = async (req, res, next) => {
    if (req.query.timestamp) {
        getValueWithTimestamp(req, res);
    }
    else {
        getLatestKeyValue(req, res);
    }
}

//handler for the post key value request
module.exports.postKeyValue = async (req, res, next) => {
    var objectKey = Object.keys(req.body)[0];
    var checkExisting = await keyValueStoreModel.findOne({ key: objectKey });
    if (checkExisting) {
        updateKeyValue(objectKey, req, res);
    }
    else {
        createKeyValue(objectKey, req, res);
    }

}

/*
* @description       gets the latest value of the requested key from key_values collection in db
* @params req,res    request and response object for the api
* @return            JSON object with key, value and timestamp
*/
function getLatestKeyValue(req, res) {
    //mongoose find query to get the complete object for requested key
    keyValueStoreModel.findOne({ key: req.params.key })
        .then((data) => {
            if (!data) {
                responseHelper.dataNotFoundResponse(res);
            }
            else {
                var responseData = {
                    value: data.values[data.values.length - 1].value
                }
                res.send(responseData);        //not using responseHelper class to send format reponse as it is not a requirement
                // responseHelper.dataFoundResponse(res, responseData);
            }
        }).catch(err => responseHelper.someThingWentWrongResponse(res, err));
}

/*
* @description       gets the value of the requested key from key_values collection in db using timestamp
* @param req,res     request and response object for the api
* @return            JSON object with value of the requested key for specific timestamp
*/
function getValueWithTimestamp(req, res) {
    //mongoose find query to get the object containing only requested timestamp value for requested key
    keyValueStoreModel.findOne({ key: req.params.key, "values.timestamp": req.query.timestamp }, { values: { $elemMatch: { timestamp: req.query.timestamp } } })
        .then((result) => {
            if (!result) {
                responseHelper.dataNotFoundResponse(res);
            }
            else {
                var responseData = {
                    value: result.values[0].value
                }
                res.send(responseData);     //not using responseHelper class to send formated reponse as it is not a requirement
                // responseHelper.dataFoundResponse(res, responseData);
            }
        }).catch(err => responseHelper.someThingWentWrongResponse(res, err));

}

/*
* @description       updates the value of a given key in mongodb in key_values collection
* @param objectKey   key to be updated in db
* @return            JSON object with key, value and timestamp
*/
function updateKeyValue(objectKey, req, res) {
    //creating json object to be pushed into values array of given key
    var obj = {
        value: req.body[objectKey],
        timestamp: new Date()
    };

    //mongoose update query to push latest value for the requested key into db
    keyValueStoreModel.updateOne({ key: objectKey }, {
        $push: {
            values: obj
        }
    }).then((data) => {
        if (data.nModified > 0) {
            responseData = {
                key: objectKey,
                value: obj.value,
                timestamp: obj.timestamp.getTime()
            };
            res.send(responseData);         //not using responseHelper class to send format reponse as it is not a requirement
            //responseHelper.dataSavedResponse(res, responseData);
        }
        else {
            responseHelper.someThingWentWrongResponse(res, null)
        }
    });
}

/*
* @description       creates a new key value pair in mongodb in key_values collection
* @param objectKey   key to be created in db
* @return            JSON object with key, value and timestamp
*/
function createKeyValue(objectKey, req, res) {
    //creating json object to be inserted in db
    var obj = {
        key: objectKey,
        values: [
            {
                value: req.body[objectKey],
                timestamp: new Date()
            }
        ]
    };

    // mongoose query to insert new key values in database
    keyValueStoreModel.create(obj, (error, data) => {
        if (error) {
            responseHelper.someThingWentWrongResponse(res, error);
        }
        var responseData = {
            key: data.key,
            value: data.values[data.values.length - 1].value,
            timestamp: data.values[data.values.length - 1].timestamp.getTime()
        }
        res.send(responseData)          //not using responseHelper class to send format reponse as it is not a requirement
        // responseHelper.dataSavedResponse(res, responseData);
    });
}

