"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_queryUntagQueueCommand = exports.deserializeAws_queryTagQueueCommand = exports.deserializeAws_querySetQueueAttributesCommand = exports.deserializeAws_querySendMessageBatchCommand = exports.deserializeAws_querySendMessageCommand = exports.deserializeAws_queryRemovePermissionCommand = exports.deserializeAws_queryReceiveMessageCommand = exports.deserializeAws_queryPurgeQueueCommand = exports.deserializeAws_queryListQueueTagsCommand = exports.deserializeAws_queryListQueuesCommand = exports.deserializeAws_queryListDeadLetterSourceQueuesCommand = exports.deserializeAws_queryGetQueueUrlCommand = exports.deserializeAws_queryGetQueueAttributesCommand = exports.deserializeAws_queryDeleteQueueCommand = exports.deserializeAws_queryDeleteMessageBatchCommand = exports.deserializeAws_queryDeleteMessageCommand = exports.deserializeAws_queryCreateQueueCommand = exports.deserializeAws_queryChangeMessageVisibilityBatchCommand = exports.deserializeAws_queryChangeMessageVisibilityCommand = exports.deserializeAws_queryAddPermissionCommand = exports.serializeAws_queryUntagQueueCommand = exports.serializeAws_queryTagQueueCommand = exports.serializeAws_querySetQueueAttributesCommand = exports.serializeAws_querySendMessageBatchCommand = exports.serializeAws_querySendMessageCommand = exports.serializeAws_queryRemovePermissionCommand = exports.serializeAws_queryReceiveMessageCommand = exports.serializeAws_queryPurgeQueueCommand = exports.serializeAws_queryListQueueTagsCommand = exports.serializeAws_queryListQueuesCommand = exports.serializeAws_queryListDeadLetterSourceQueuesCommand = exports.serializeAws_queryGetQueueUrlCommand = exports.serializeAws_queryGetQueueAttributesCommand = exports.serializeAws_queryDeleteQueueCommand = exports.serializeAws_queryDeleteMessageBatchCommand = exports.serializeAws_queryDeleteMessageCommand = exports.serializeAws_queryCreateQueueCommand = exports.serializeAws_queryChangeMessageVisibilityBatchCommand = exports.serializeAws_queryChangeMessageVisibilityCommand = exports.serializeAws_queryAddPermissionCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const fast_xml_parser_1 = require("fast-xml-parser");
const models_0_1 = require("../models/models_0");
const SQSServiceException_1 = require("../models/SQSServiceException");
const serializeAws_queryAddPermissionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryAddPermissionRequest(input, context),
        Action: "AddPermission",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryAddPermissionCommand = serializeAws_queryAddPermissionCommand;
const serializeAws_queryChangeMessageVisibilityCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryChangeMessageVisibilityRequest(input, context),
        Action: "ChangeMessageVisibility",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryChangeMessageVisibilityCommand = serializeAws_queryChangeMessageVisibilityCommand;
const serializeAws_queryChangeMessageVisibilityBatchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryChangeMessageVisibilityBatchRequest(input, context),
        Action: "ChangeMessageVisibilityBatch",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryChangeMessageVisibilityBatchCommand = serializeAws_queryChangeMessageVisibilityBatchCommand;
const serializeAws_queryCreateQueueCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryCreateQueueRequest(input, context),
        Action: "CreateQueue",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryCreateQueueCommand = serializeAws_queryCreateQueueCommand;
const serializeAws_queryDeleteMessageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryDeleteMessageRequest(input, context),
        Action: "DeleteMessage",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryDeleteMessageCommand = serializeAws_queryDeleteMessageCommand;
const serializeAws_queryDeleteMessageBatchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryDeleteMessageBatchRequest(input, context),
        Action: "DeleteMessageBatch",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryDeleteMessageBatchCommand = serializeAws_queryDeleteMessageBatchCommand;
const serializeAws_queryDeleteQueueCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryDeleteQueueRequest(input, context),
        Action: "DeleteQueue",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryDeleteQueueCommand = serializeAws_queryDeleteQueueCommand;
const serializeAws_queryGetQueueAttributesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetQueueAttributesRequest(input, context),
        Action: "GetQueueAttributes",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetQueueAttributesCommand = serializeAws_queryGetQueueAttributesCommand;
const serializeAws_queryGetQueueUrlCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryGetQueueUrlRequest(input, context),
        Action: "GetQueueUrl",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryGetQueueUrlCommand = serializeAws_queryGetQueueUrlCommand;
const serializeAws_queryListDeadLetterSourceQueuesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryListDeadLetterSourceQueuesRequest(input, context),
        Action: "ListDeadLetterSourceQueues",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryListDeadLetterSourceQueuesCommand = serializeAws_queryListDeadLetterSourceQueuesCommand;
const serializeAws_queryListQueuesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryListQueuesRequest(input, context),
        Action: "ListQueues",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryListQueuesCommand = serializeAws_queryListQueuesCommand;
const serializeAws_queryListQueueTagsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryListQueueTagsRequest(input, context),
        Action: "ListQueueTags",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryListQueueTagsCommand = serializeAws_queryListQueueTagsCommand;
const serializeAws_queryPurgeQueueCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryPurgeQueueRequest(input, context),
        Action: "PurgeQueue",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryPurgeQueueCommand = serializeAws_queryPurgeQueueCommand;
const serializeAws_queryReceiveMessageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryReceiveMessageRequest(input, context),
        Action: "ReceiveMessage",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryReceiveMessageCommand = serializeAws_queryReceiveMessageCommand;
const serializeAws_queryRemovePermissionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryRemovePermissionRequest(input, context),
        Action: "RemovePermission",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryRemovePermissionCommand = serializeAws_queryRemovePermissionCommand;
const serializeAws_querySendMessageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_querySendMessageRequest(input, context),
        Action: "SendMessage",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_querySendMessageCommand = serializeAws_querySendMessageCommand;
const serializeAws_querySendMessageBatchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_querySendMessageBatchRequest(input, context),
        Action: "SendMessageBatch",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_querySendMessageBatchCommand = serializeAws_querySendMessageBatchCommand;
const serializeAws_querySetQueueAttributesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_querySetQueueAttributesRequest(input, context),
        Action: "SetQueueAttributes",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_querySetQueueAttributesCommand = serializeAws_querySetQueueAttributesCommand;
const serializeAws_queryTagQueueCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryTagQueueRequest(input, context),
        Action: "TagQueue",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryTagQueueCommand = serializeAws_queryTagQueueCommand;
const serializeAws_queryUntagQueueCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
    };
    let body;
    body = buildFormUrlencodedString({
        ...serializeAws_queryUntagQueueRequest(input, context),
        Action: "UntagQueue",
        Version: "2012-11-05",
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_queryUntagQueueCommand = serializeAws_queryUntagQueueCommand;
const deserializeAws_queryAddPermissionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryAddPermissionCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryAddPermissionCommand = deserializeAws_queryAddPermissionCommand;
const deserializeAws_queryAddPermissionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "OverLimit":
        case "com.amazonaws.sqs#OverLimit":
            throw await deserializeAws_queryOverLimitResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryChangeMessageVisibilityCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryChangeMessageVisibilityCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryChangeMessageVisibilityCommand = deserializeAws_queryChangeMessageVisibilityCommand;
const deserializeAws_queryChangeMessageVisibilityCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.MessageNotInflight":
        case "com.amazonaws.sqs#MessageNotInflight":
            throw await deserializeAws_queryMessageNotInflightResponse(parsedOutput, context);
        case "ReceiptHandleIsInvalid":
        case "com.amazonaws.sqs#ReceiptHandleIsInvalid":
            throw await deserializeAws_queryReceiptHandleIsInvalidResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryChangeMessageVisibilityBatchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryChangeMessageVisibilityBatchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryChangeMessageVisibilityBatchResult(data.ChangeMessageVisibilityBatchResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryChangeMessageVisibilityBatchCommand = deserializeAws_queryChangeMessageVisibilityBatchCommand;
const deserializeAws_queryChangeMessageVisibilityBatchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.BatchEntryIdsNotDistinct":
        case "com.amazonaws.sqs#BatchEntryIdsNotDistinct":
            throw await deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.EmptyBatchRequest":
        case "com.amazonaws.sqs#EmptyBatchRequest":
            throw await deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.InvalidBatchEntryId":
        case "com.amazonaws.sqs#InvalidBatchEntryId":
            throw await deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.TooManyEntriesInBatchRequest":
        case "com.amazonaws.sqs#TooManyEntriesInBatchRequest":
            throw await deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryCreateQueueCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryCreateQueueCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryCreateQueueResult(data.CreateQueueResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryCreateQueueCommand = deserializeAws_queryCreateQueueCommand;
const deserializeAws_queryCreateQueueCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.QueueDeletedRecently":
        case "com.amazonaws.sqs#QueueDeletedRecently":
            throw await deserializeAws_queryQueueDeletedRecentlyResponse(parsedOutput, context);
        case "QueueAlreadyExists":
        case "com.amazonaws.sqs#QueueNameExists":
            throw await deserializeAws_queryQueueNameExistsResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryDeleteMessageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryDeleteMessageCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryDeleteMessageCommand = deserializeAws_queryDeleteMessageCommand;
const deserializeAws_queryDeleteMessageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidIdFormat":
        case "com.amazonaws.sqs#InvalidIdFormat":
            throw await deserializeAws_queryInvalidIdFormatResponse(parsedOutput, context);
        case "ReceiptHandleIsInvalid":
        case "com.amazonaws.sqs#ReceiptHandleIsInvalid":
            throw await deserializeAws_queryReceiptHandleIsInvalidResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryDeleteMessageBatchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryDeleteMessageBatchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryDeleteMessageBatchResult(data.DeleteMessageBatchResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryDeleteMessageBatchCommand = deserializeAws_queryDeleteMessageBatchCommand;
const deserializeAws_queryDeleteMessageBatchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.BatchEntryIdsNotDistinct":
        case "com.amazonaws.sqs#BatchEntryIdsNotDistinct":
            throw await deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.EmptyBatchRequest":
        case "com.amazonaws.sqs#EmptyBatchRequest":
            throw await deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.InvalidBatchEntryId":
        case "com.amazonaws.sqs#InvalidBatchEntryId":
            throw await deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.TooManyEntriesInBatchRequest":
        case "com.amazonaws.sqs#TooManyEntriesInBatchRequest":
            throw await deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryDeleteQueueCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryDeleteQueueCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryDeleteQueueCommand = deserializeAws_queryDeleteQueueCommand;
const deserializeAws_queryDeleteQueueCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_queryGetQueueAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetQueueAttributesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetQueueAttributesResult(data.GetQueueAttributesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetQueueAttributesCommand = deserializeAws_queryGetQueueAttributesCommand;
const deserializeAws_queryGetQueueAttributesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidAttributeName":
        case "com.amazonaws.sqs#InvalidAttributeName":
            throw await deserializeAws_queryInvalidAttributeNameResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryGetQueueUrlCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryGetQueueUrlCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryGetQueueUrlResult(data.GetQueueUrlResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryGetQueueUrlCommand = deserializeAws_queryGetQueueUrlCommand;
const deserializeAws_queryGetQueueUrlCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.NonExistentQueue":
        case "com.amazonaws.sqs#QueueDoesNotExist":
            throw await deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryListDeadLetterSourceQueuesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryListDeadLetterSourceQueuesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryListDeadLetterSourceQueuesResult(data.ListDeadLetterSourceQueuesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryListDeadLetterSourceQueuesCommand = deserializeAws_queryListDeadLetterSourceQueuesCommand;
const deserializeAws_queryListDeadLetterSourceQueuesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.NonExistentQueue":
        case "com.amazonaws.sqs#QueueDoesNotExist":
            throw await deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryListQueuesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryListQueuesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryListQueuesResult(data.ListQueuesResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryListQueuesCommand = deserializeAws_queryListQueuesCommand;
const deserializeAws_queryListQueuesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_queryListQueueTagsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryListQueueTagsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryListQueueTagsResult(data.ListQueueTagsResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryListQueueTagsCommand = deserializeAws_queryListQueueTagsCommand;
const deserializeAws_queryListQueueTagsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_queryPurgeQueueCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryPurgeQueueCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryPurgeQueueCommand = deserializeAws_queryPurgeQueueCommand;
const deserializeAws_queryPurgeQueueCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.NonExistentQueue":
        case "com.amazonaws.sqs#QueueDoesNotExist":
            throw await deserializeAws_queryQueueDoesNotExistResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.PurgeQueueInProgress":
        case "com.amazonaws.sqs#PurgeQueueInProgress":
            throw await deserializeAws_queryPurgeQueueInProgressResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryReceiveMessageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryReceiveMessageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_queryReceiveMessageResult(data.ReceiveMessageResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryReceiveMessageCommand = deserializeAws_queryReceiveMessageCommand;
const deserializeAws_queryReceiveMessageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "OverLimit":
        case "com.amazonaws.sqs#OverLimit":
            throw await deserializeAws_queryOverLimitResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryRemovePermissionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryRemovePermissionCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryRemovePermissionCommand = deserializeAws_queryRemovePermissionCommand;
const deserializeAws_queryRemovePermissionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_querySendMessageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_querySendMessageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_querySendMessageResult(data.SendMessageResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_querySendMessageCommand = deserializeAws_querySendMessageCommand;
const deserializeAws_querySendMessageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.UnsupportedOperation":
        case "com.amazonaws.sqs#UnsupportedOperation":
            throw await deserializeAws_queryUnsupportedOperationResponse(parsedOutput, context);
        case "InvalidMessageContents":
        case "com.amazonaws.sqs#InvalidMessageContents":
            throw await deserializeAws_queryInvalidMessageContentsResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_querySendMessageBatchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_querySendMessageBatchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_querySendMessageBatchResult(data.SendMessageBatchResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_querySendMessageBatchCommand = deserializeAws_querySendMessageBatchCommand;
const deserializeAws_querySendMessageBatchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AWS.SimpleQueueService.BatchEntryIdsNotDistinct":
        case "com.amazonaws.sqs#BatchEntryIdsNotDistinct":
            throw await deserializeAws_queryBatchEntryIdsNotDistinctResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.BatchRequestTooLong":
        case "com.amazonaws.sqs#BatchRequestTooLong":
            throw await deserializeAws_queryBatchRequestTooLongResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.EmptyBatchRequest":
        case "com.amazonaws.sqs#EmptyBatchRequest":
            throw await deserializeAws_queryEmptyBatchRequestResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.InvalidBatchEntryId":
        case "com.amazonaws.sqs#InvalidBatchEntryId":
            throw await deserializeAws_queryInvalidBatchEntryIdResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.TooManyEntriesInBatchRequest":
        case "com.amazonaws.sqs#TooManyEntriesInBatchRequest":
            throw await deserializeAws_queryTooManyEntriesInBatchRequestResponse(parsedOutput, context);
        case "AWS.SimpleQueueService.UnsupportedOperation":
        case "com.amazonaws.sqs#UnsupportedOperation":
            throw await deserializeAws_queryUnsupportedOperationResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_querySetQueueAttributesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_querySetQueueAttributesCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_querySetQueueAttributesCommand = deserializeAws_querySetQueueAttributesCommand;
const deserializeAws_querySetQueueAttributesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidAttributeName":
        case "com.amazonaws.sqs#InvalidAttributeName":
            throw await deserializeAws_queryInvalidAttributeNameResponse(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            (0, smithy_client_1.throwDefaultError)({
                output,
                parsedBody: parsedBody.Error,
                exceptionCtor: SQSServiceException_1.SQSServiceException,
                errorCode,
            });
    }
};
const deserializeAws_queryTagQueueCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryTagQueueCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryTagQueueCommand = deserializeAws_queryTagQueueCommand;
const deserializeAws_queryTagQueueCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_queryUntagQueueCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_queryUntagQueueCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_queryUntagQueueCommand = deserializeAws_queryUntagQueueCommand;
const deserializeAws_queryUntagQueueCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    const parsedBody = parsedOutput.body;
    (0, smithy_client_1.throwDefaultError)({
        output,
        parsedBody: parsedBody.Error,
        exceptionCtor: SQSServiceException_1.SQSServiceException,
        errorCode,
    });
};
const deserializeAws_queryBatchEntryIdsNotDistinctResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryBatchEntryIdsNotDistinct(body.Error, context);
    const exception = new models_0_1.BatchEntryIdsNotDistinct({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryBatchRequestTooLongResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryBatchRequestTooLong(body.Error, context);
    const exception = new models_0_1.BatchRequestTooLong({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryEmptyBatchRequestResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryEmptyBatchRequest(body.Error, context);
    const exception = new models_0_1.EmptyBatchRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidAttributeNameResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidAttributeName(body.Error, context);
    const exception = new models_0_1.InvalidAttributeName({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidBatchEntryIdResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidBatchEntryId(body.Error, context);
    const exception = new models_0_1.InvalidBatchEntryId({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidIdFormatResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidIdFormat(body.Error, context);
    const exception = new models_0_1.InvalidIdFormat({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryInvalidMessageContentsResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryInvalidMessageContents(body.Error, context);
    const exception = new models_0_1.InvalidMessageContents({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryMessageNotInflightResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryMessageNotInflight(body.Error, context);
    const exception = new models_0_1.MessageNotInflight({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryOverLimitResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryOverLimit(body.Error, context);
    const exception = new models_0_1.OverLimit({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryPurgeQueueInProgressResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryPurgeQueueInProgress(body.Error, context);
    const exception = new models_0_1.PurgeQueueInProgress({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryQueueDeletedRecentlyResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryQueueDeletedRecently(body.Error, context);
    const exception = new models_0_1.QueueDeletedRecently({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryQueueDoesNotExistResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryQueueDoesNotExist(body.Error, context);
    const exception = new models_0_1.QueueDoesNotExist({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryQueueNameExistsResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryQueueNameExists(body.Error, context);
    const exception = new models_0_1.QueueNameExists({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryReceiptHandleIsInvalidResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryReceiptHandleIsInvalid(body.Error, context);
    const exception = new models_0_1.ReceiptHandleIsInvalid({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryTooManyEntriesInBatchRequestResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryTooManyEntriesInBatchRequest(body.Error, context);
    const exception = new models_0_1.TooManyEntriesInBatchRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const deserializeAws_queryUnsupportedOperationResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_queryUnsupportedOperation(body.Error, context);
    const exception = new models_0_1.UnsupportedOperation({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    });
    return (0, smithy_client_1.decorateServiceException)(exception, body);
};
const serializeAws_queryActionNameList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryAddPermissionRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Label != null) {
        entries["Label"] = input.Label;
    }
    if (input.AWSAccountIds != null) {
        const memberEntries = serializeAws_queryAWSAccountIdList(input.AWSAccountIds, context);
        if (input.AWSAccountIds?.length === 0) {
            entries.AWSAccountId = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `AWSAccountId.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.Actions != null) {
        const memberEntries = serializeAws_queryActionNameList(input.Actions, context);
        if (input.Actions?.length === 0) {
            entries.ActionName = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `ActionName.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryAttributeNameList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryAWSAccountIdList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryBinaryList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`BinaryListValue.${counter}`] = context.base64Encoder(entry);
        counter++;
    }
    return entries;
};
const serializeAws_queryChangeMessageVisibilityBatchRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries != null) {
        const memberEntries = serializeAws_queryChangeMessageVisibilityBatchRequestEntryList(input.Entries, context);
        if (input.Entries?.length === 0) {
            entries.ChangeMessageVisibilityBatchRequestEntry = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `ChangeMessageVisibilityBatchRequestEntry.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryChangeMessageVisibilityBatchRequestEntry = (input, context) => {
    const entries = {};
    if (input.Id != null) {
        entries["Id"] = input.Id;
    }
    if (input.ReceiptHandle != null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    if (input.VisibilityTimeout != null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    return entries;
};
const serializeAws_queryChangeMessageVisibilityBatchRequestEntryList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = serializeAws_queryChangeMessageVisibilityBatchRequestEntry(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const serializeAws_queryChangeMessageVisibilityRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.ReceiptHandle != null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    if (input.VisibilityTimeout != null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    return entries;
};
const serializeAws_queryCreateQueueRequest = (input, context) => {
    const entries = {};
    if (input.QueueName != null) {
        entries["QueueName"] = input.QueueName;
    }
    if (input.tags != null) {
        const memberEntries = serializeAws_queryTagMap(input.tags, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tag.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.Attributes != null) {
        const memberEntries = serializeAws_queryQueueAttributeMap(input.Attributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryDeleteMessageBatchRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries != null) {
        const memberEntries = serializeAws_queryDeleteMessageBatchRequestEntryList(input.Entries, context);
        if (input.Entries?.length === 0) {
            entries.DeleteMessageBatchRequestEntry = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `DeleteMessageBatchRequestEntry.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryDeleteMessageBatchRequestEntry = (input, context) => {
    const entries = {};
    if (input.Id != null) {
        entries["Id"] = input.Id;
    }
    if (input.ReceiptHandle != null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    return entries;
};
const serializeAws_queryDeleteMessageBatchRequestEntryList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = serializeAws_queryDeleteMessageBatchRequestEntry(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const serializeAws_queryDeleteMessageRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.ReceiptHandle != null) {
        entries["ReceiptHandle"] = input.ReceiptHandle;
    }
    return entries;
};
const serializeAws_queryDeleteQueueRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
const serializeAws_queryGetQueueAttributesRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.AttributeNames != null) {
        const memberEntries = serializeAws_queryAttributeNameList(input.AttributeNames, context);
        if (input.AttributeNames?.length === 0) {
            entries.AttributeName = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `AttributeName.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryGetQueueUrlRequest = (input, context) => {
    const entries = {};
    if (input.QueueName != null) {
        entries["QueueName"] = input.QueueName;
    }
    if (input.QueueOwnerAWSAccountId != null) {
        entries["QueueOwnerAWSAccountId"] = input.QueueOwnerAWSAccountId;
    }
    return entries;
};
const serializeAws_queryListDeadLetterSourceQueuesRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.NextToken != null) {
        entries["NextToken"] = input.NextToken;
    }
    if (input.MaxResults != null) {
        entries["MaxResults"] = input.MaxResults;
    }
    return entries;
};
const serializeAws_queryListQueuesRequest = (input, context) => {
    const entries = {};
    if (input.QueueNamePrefix != null) {
        entries["QueueNamePrefix"] = input.QueueNamePrefix;
    }
    if (input.NextToken != null) {
        entries["NextToken"] = input.NextToken;
    }
    if (input.MaxResults != null) {
        entries["MaxResults"] = input.MaxResults;
    }
    return entries;
};
const serializeAws_queryListQueueTagsRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
const serializeAws_queryMessageAttributeNameList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryMessageAttributeValue = (input, context) => {
    const entries = {};
    if (input.StringValue != null) {
        entries["StringValue"] = input.StringValue;
    }
    if (input.BinaryValue != null) {
        entries["BinaryValue"] = context.base64Encoder(input.BinaryValue);
    }
    if (input.StringListValues != null) {
        const memberEntries = serializeAws_queryStringList(input.StringListValues, context);
        if (input.StringListValues?.length === 0) {
            entries.StringListValue = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `StringListValue.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.BinaryListValues != null) {
        const memberEntries = serializeAws_queryBinaryList(input.BinaryListValues, context);
        if (input.BinaryListValues?.length === 0) {
            entries.BinaryListValue = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `BinaryListValue.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.DataType != null) {
        entries["DataType"] = input.DataType;
    }
    return entries;
};
const serializeAws_queryMessageBodyAttributeMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.Name`] = key;
        const memberEntries = serializeAws_queryMessageAttributeValue(input[key], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`entry.${counter}.Value.${key}`] = value;
        });
        counter++;
    });
    return entries;
};
const serializeAws_queryMessageBodySystemAttributeMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.Name`] = key;
        const memberEntries = serializeAws_queryMessageSystemAttributeValue(input[key], context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`entry.${counter}.Value.${key}`] = value;
        });
        counter++;
    });
    return entries;
};
const serializeAws_queryMessageSystemAttributeValue = (input, context) => {
    const entries = {};
    if (input.StringValue != null) {
        entries["StringValue"] = input.StringValue;
    }
    if (input.BinaryValue != null) {
        entries["BinaryValue"] = context.base64Encoder(input.BinaryValue);
    }
    if (input.StringListValues != null) {
        const memberEntries = serializeAws_queryStringList(input.StringListValues, context);
        if (input.StringListValues?.length === 0) {
            entries.StringListValue = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `StringListValue.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.BinaryListValues != null) {
        const memberEntries = serializeAws_queryBinaryList(input.BinaryListValues, context);
        if (input.BinaryListValues?.length === 0) {
            entries.BinaryListValue = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `BinaryListValue.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.DataType != null) {
        entries["DataType"] = input.DataType;
    }
    return entries;
};
const serializeAws_queryPurgeQueueRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    return entries;
};
const serializeAws_queryQueueAttributeMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.Name`] = key;
        entries[`entry.${counter}.Value`] = input[key];
        counter++;
    });
    return entries;
};
const serializeAws_queryReceiveMessageRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.AttributeNames != null) {
        const memberEntries = serializeAws_queryAttributeNameList(input.AttributeNames, context);
        if (input.AttributeNames?.length === 0) {
            entries.AttributeName = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `AttributeName.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MessageAttributeNames != null) {
        const memberEntries = serializeAws_queryMessageAttributeNameList(input.MessageAttributeNames, context);
        if (input.MessageAttributeNames?.length === 0) {
            entries.MessageAttributeName = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageAttributeName.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MaxNumberOfMessages != null) {
        entries["MaxNumberOfMessages"] = input.MaxNumberOfMessages;
    }
    if (input.VisibilityTimeout != null) {
        entries["VisibilityTimeout"] = input.VisibilityTimeout;
    }
    if (input.WaitTimeSeconds != null) {
        entries["WaitTimeSeconds"] = input.WaitTimeSeconds;
    }
    if (input.ReceiveRequestAttemptId != null) {
        entries["ReceiveRequestAttemptId"] = input.ReceiveRequestAttemptId;
    }
    return entries;
};
const serializeAws_queryRemovePermissionRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Label != null) {
        entries["Label"] = input.Label;
    }
    return entries;
};
const serializeAws_querySendMessageBatchRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Entries != null) {
        const memberEntries = serializeAws_querySendMessageBatchRequestEntryList(input.Entries, context);
        if (input.Entries?.length === 0) {
            entries.SendMessageBatchRequestEntry = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `SendMessageBatchRequestEntry.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_querySendMessageBatchRequestEntry = (input, context) => {
    const entries = {};
    if (input.Id != null) {
        entries["Id"] = input.Id;
    }
    if (input.MessageBody != null) {
        entries["MessageBody"] = input.MessageBody;
    }
    if (input.DelaySeconds != null) {
        entries["DelaySeconds"] = input.DelaySeconds;
    }
    if (input.MessageAttributes != null) {
        const memberEntries = serializeAws_queryMessageBodyAttributeMap(input.MessageAttributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageAttribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MessageSystemAttributes != null) {
        const memberEntries = serializeAws_queryMessageBodySystemAttributeMap(input.MessageSystemAttributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageSystemAttribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MessageDeduplicationId != null) {
        entries["MessageDeduplicationId"] = input.MessageDeduplicationId;
    }
    if (input.MessageGroupId != null) {
        entries["MessageGroupId"] = input.MessageGroupId;
    }
    return entries;
};
const serializeAws_querySendMessageBatchRequestEntryList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        const memberEntries = serializeAws_querySendMessageBatchRequestEntry(entry, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const serializeAws_querySendMessageRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.MessageBody != null) {
        entries["MessageBody"] = input.MessageBody;
    }
    if (input.DelaySeconds != null) {
        entries["DelaySeconds"] = input.DelaySeconds;
    }
    if (input.MessageAttributes != null) {
        const memberEntries = serializeAws_queryMessageBodyAttributeMap(input.MessageAttributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageAttribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MessageSystemAttributes != null) {
        const memberEntries = serializeAws_queryMessageBodySystemAttributeMap(input.MessageSystemAttributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `MessageSystemAttribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    if (input.MessageDeduplicationId != null) {
        entries["MessageDeduplicationId"] = input.MessageDeduplicationId;
    }
    if (input.MessageGroupId != null) {
        entries["MessageGroupId"] = input.MessageGroupId;
    }
    return entries;
};
const serializeAws_querySetQueueAttributesRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Attributes != null) {
        const memberEntries = serializeAws_queryQueueAttributeMap(input.Attributes, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Attribute.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryStringList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`StringListValue.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryTagKeyList = (input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const serializeAws_queryTagMap = (input, context) => {
    const entries = {};
    let counter = 1;
    Object.keys(input)
        .filter((key) => input[key] != null)
        .forEach((key) => {
        entries[`entry.${counter}.Key`] = key;
        entries[`entry.${counter}.Value`] = input[key];
        counter++;
    });
    return entries;
};
const serializeAws_queryTagQueueRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.Tags != null) {
        const memberEntries = serializeAws_queryTagMap(input.Tags, context);
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `Tag.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const serializeAws_queryUntagQueueRequest = (input, context) => {
    const entries = {};
    if (input.QueueUrl != null) {
        entries["QueueUrl"] = input.QueueUrl;
    }
    if (input.TagKeys != null) {
        const memberEntries = serializeAws_queryTagKeyList(input.TagKeys, context);
        if (input.TagKeys?.length === 0) {
            entries.TagKey = [];
        }
        Object.entries(memberEntries).forEach(([key, value]) => {
            const loc = `TagKey.${key.substring(key.indexOf(".") + 1)}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const deserializeAws_queryBatchEntryIdsNotDistinct = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryBatchRequestTooLong = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryBatchResultErrorEntry = (output, context) => {
    const contents = {};
    if (output["Id"] !== undefined) {
        contents.Id = (0, smithy_client_1.expectString)(output["Id"]);
    }
    if (output["SenderFault"] !== undefined) {
        contents.SenderFault = (0, smithy_client_1.parseBoolean)(output["SenderFault"]);
    }
    if (output["Code"] !== undefined) {
        contents.Code = (0, smithy_client_1.expectString)(output["Code"]);
    }
    if (output["Message"] !== undefined) {
        contents.Message = (0, smithy_client_1.expectString)(output["Message"]);
    }
    return contents;
};
const deserializeAws_queryBatchResultErrorEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return deserializeAws_queryBatchResultErrorEntry(entry, context);
    });
};
const deserializeAws_queryBinaryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return context.base64Decoder(entry);
    });
};
const deserializeAws_queryChangeMessageVisibilityBatchResult = (output, context) => {
    const contents = {};
    if (output.ChangeMessageVisibilityBatchResultEntry === "") {
        contents.Successful = [];
    }
    else if (output["ChangeMessageVisibilityBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_queryChangeMessageVisibilityBatchResultEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["ChangeMessageVisibilityBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    else if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["BatchResultErrorEntry"]), context);
    }
    return contents;
};
const deserializeAws_queryChangeMessageVisibilityBatchResultEntry = (output, context) => {
    const contents = {};
    if (output["Id"] !== undefined) {
        contents.Id = (0, smithy_client_1.expectString)(output["Id"]);
    }
    return contents;
};
const deserializeAws_queryChangeMessageVisibilityBatchResultEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return deserializeAws_queryChangeMessageVisibilityBatchResultEntry(entry, context);
    });
};
const deserializeAws_queryCreateQueueResult = (output, context) => {
    const contents = {};
    if (output["QueueUrl"] !== undefined) {
        contents.QueueUrl = (0, smithy_client_1.expectString)(output["QueueUrl"]);
    }
    return contents;
};
const deserializeAws_queryDeleteMessageBatchResult = (output, context) => {
    const contents = {};
    if (output.DeleteMessageBatchResultEntry === "") {
        contents.Successful = [];
    }
    else if (output["DeleteMessageBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_queryDeleteMessageBatchResultEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["DeleteMessageBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    else if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["BatchResultErrorEntry"]), context);
    }
    return contents;
};
const deserializeAws_queryDeleteMessageBatchResultEntry = (output, context) => {
    const contents = {};
    if (output["Id"] !== undefined) {
        contents.Id = (0, smithy_client_1.expectString)(output["Id"]);
    }
    return contents;
};
const deserializeAws_queryDeleteMessageBatchResultEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return deserializeAws_queryDeleteMessageBatchResultEntry(entry, context);
    });
};
const deserializeAws_queryEmptyBatchRequest = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryGetQueueAttributesResult = (output, context) => {
    const contents = {};
    if (output.Attribute === "") {
        contents.Attributes = {};
    }
    else if (output["Attribute"] !== undefined) {
        contents.Attributes = deserializeAws_queryQueueAttributeMap((0, smithy_client_1.getArrayIfSingleItem)(output["Attribute"]), context);
    }
    return contents;
};
const deserializeAws_queryGetQueueUrlResult = (output, context) => {
    const contents = {};
    if (output["QueueUrl"] !== undefined) {
        contents.QueueUrl = (0, smithy_client_1.expectString)(output["QueueUrl"]);
    }
    return contents;
};
const deserializeAws_queryInvalidAttributeName = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryInvalidBatchEntryId = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryInvalidIdFormat = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryInvalidMessageContents = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryListDeadLetterSourceQueuesResult = (output, context) => {
    const contents = {};
    if (output.QueueUrl === "") {
        contents.queueUrls = [];
    }
    else if (output["QueueUrl"] !== undefined) {
        contents.queueUrls = deserializeAws_queryQueueUrlList((0, smithy_client_1.getArrayIfSingleItem)(output["QueueUrl"]), context);
    }
    if (output["NextToken"] !== undefined) {
        contents.NextToken = (0, smithy_client_1.expectString)(output["NextToken"]);
    }
    return contents;
};
const deserializeAws_queryListQueuesResult = (output, context) => {
    const contents = {};
    if (output["NextToken"] !== undefined) {
        contents.NextToken = (0, smithy_client_1.expectString)(output["NextToken"]);
    }
    if (output.QueueUrl === "") {
        contents.QueueUrls = [];
    }
    else if (output["QueueUrl"] !== undefined) {
        contents.QueueUrls = deserializeAws_queryQueueUrlList((0, smithy_client_1.getArrayIfSingleItem)(output["QueueUrl"]), context);
    }
    return contents;
};
const deserializeAws_queryListQueueTagsResult = (output, context) => {
    const contents = {};
    if (output.Tag === "") {
        contents.Tags = {};
    }
    else if (output["Tag"] !== undefined) {
        contents.Tags = deserializeAws_queryTagMap((0, smithy_client_1.getArrayIfSingleItem)(output["Tag"]), context);
    }
    return contents;
};
const deserializeAws_queryMessage = (output, context) => {
    const contents = {};
    if (output["MessageId"] !== undefined) {
        contents.MessageId = (0, smithy_client_1.expectString)(output["MessageId"]);
    }
    if (output["ReceiptHandle"] !== undefined) {
        contents.ReceiptHandle = (0, smithy_client_1.expectString)(output["ReceiptHandle"]);
    }
    if (output["MD5OfBody"] !== undefined) {
        contents.MD5OfBody = (0, smithy_client_1.expectString)(output["MD5OfBody"]);
    }
    if (output["Body"] !== undefined) {
        contents.Body = (0, smithy_client_1.expectString)(output["Body"]);
    }
    if (output.Attribute === "") {
        contents.Attributes = {};
    }
    else if (output["Attribute"] !== undefined) {
        contents.Attributes = deserializeAws_queryMessageSystemAttributeMap((0, smithy_client_1.getArrayIfSingleItem)(output["Attribute"]), context);
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = (0, smithy_client_1.expectString)(output["MD5OfMessageAttributes"]);
    }
    if (output.MessageAttribute === "") {
        contents.MessageAttributes = {};
    }
    else if (output["MessageAttribute"] !== undefined) {
        contents.MessageAttributes = deserializeAws_queryMessageBodyAttributeMap((0, smithy_client_1.getArrayIfSingleItem)(output["MessageAttribute"]), context);
    }
    return contents;
};
const deserializeAws_queryMessageAttributeValue = (output, context) => {
    const contents = {};
    if (output["StringValue"] !== undefined) {
        contents.StringValue = (0, smithy_client_1.expectString)(output["StringValue"]);
    }
    if (output["BinaryValue"] !== undefined) {
        contents.BinaryValue = context.base64Decoder(output["BinaryValue"]);
    }
    if (output.StringListValue === "") {
        contents.StringListValues = [];
    }
    else if (output["StringListValue"] !== undefined) {
        contents.StringListValues = deserializeAws_queryStringList((0, smithy_client_1.getArrayIfSingleItem)(output["StringListValue"]), context);
    }
    if (output.BinaryListValue === "") {
        contents.BinaryListValues = [];
    }
    else if (output["BinaryListValue"] !== undefined) {
        contents.BinaryListValues = deserializeAws_queryBinaryList((0, smithy_client_1.getArrayIfSingleItem)(output["BinaryListValue"]), context);
    }
    if (output["DataType"] !== undefined) {
        contents.DataType = (0, smithy_client_1.expectString)(output["DataType"]);
    }
    return contents;
};
const deserializeAws_queryMessageBodyAttributeMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["Value"] === null) {
            return acc;
        }
        acc[pair["Name"]] = deserializeAws_queryMessageAttributeValue(pair["Value"], context);
        return acc;
    }, {});
};
const deserializeAws_queryMessageList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return deserializeAws_queryMessage(entry, context);
    });
};
const deserializeAws_queryMessageNotInflight = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryMessageSystemAttributeMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["Value"] === null) {
            return acc;
        }
        acc[pair["Name"]] = (0, smithy_client_1.expectString)(pair["Value"]);
        return acc;
    }, {});
};
const deserializeAws_queryOverLimit = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryPurgeQueueInProgress = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryQueueAttributeMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["Value"] === null) {
            return acc;
        }
        acc[pair["Name"]] = (0, smithy_client_1.expectString)(pair["Value"]);
        return acc;
    }, {});
};
const deserializeAws_queryQueueDeletedRecently = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryQueueDoesNotExist = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryQueueNameExists = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryQueueUrlList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return (0, smithy_client_1.expectString)(entry);
    });
};
const deserializeAws_queryReceiptHandleIsInvalid = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryReceiveMessageResult = (output, context) => {
    const contents = {};
    if (output.Message === "") {
        contents.Messages = [];
    }
    else if (output["Message"] !== undefined) {
        contents.Messages = deserializeAws_queryMessageList((0, smithy_client_1.getArrayIfSingleItem)(output["Message"]), context);
    }
    return contents;
};
const deserializeAws_querySendMessageBatchResult = (output, context) => {
    const contents = {};
    if (output.SendMessageBatchResultEntry === "") {
        contents.Successful = [];
    }
    else if (output["SendMessageBatchResultEntry"] !== undefined) {
        contents.Successful = deserializeAws_querySendMessageBatchResultEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["SendMessageBatchResultEntry"]), context);
    }
    if (output.BatchResultErrorEntry === "") {
        contents.Failed = [];
    }
    else if (output["BatchResultErrorEntry"] !== undefined) {
        contents.Failed = deserializeAws_queryBatchResultErrorEntryList((0, smithy_client_1.getArrayIfSingleItem)(output["BatchResultErrorEntry"]), context);
    }
    return contents;
};
const deserializeAws_querySendMessageBatchResultEntry = (output, context) => {
    const contents = {};
    if (output["Id"] !== undefined) {
        contents.Id = (0, smithy_client_1.expectString)(output["Id"]);
    }
    if (output["MessageId"] !== undefined) {
        contents.MessageId = (0, smithy_client_1.expectString)(output["MessageId"]);
    }
    if (output["MD5OfMessageBody"] !== undefined) {
        contents.MD5OfMessageBody = (0, smithy_client_1.expectString)(output["MD5OfMessageBody"]);
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = (0, smithy_client_1.expectString)(output["MD5OfMessageAttributes"]);
    }
    if (output["MD5OfMessageSystemAttributes"] !== undefined) {
        contents.MD5OfMessageSystemAttributes = (0, smithy_client_1.expectString)(output["MD5OfMessageSystemAttributes"]);
    }
    if (output["SequenceNumber"] !== undefined) {
        contents.SequenceNumber = (0, smithy_client_1.expectString)(output["SequenceNumber"]);
    }
    return contents;
};
const deserializeAws_querySendMessageBatchResultEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return deserializeAws_querySendMessageBatchResultEntry(entry, context);
    });
};
const deserializeAws_querySendMessageResult = (output, context) => {
    const contents = {};
    if (output["MD5OfMessageBody"] !== undefined) {
        contents.MD5OfMessageBody = (0, smithy_client_1.expectString)(output["MD5OfMessageBody"]);
    }
    if (output["MD5OfMessageAttributes"] !== undefined) {
        contents.MD5OfMessageAttributes = (0, smithy_client_1.expectString)(output["MD5OfMessageAttributes"]);
    }
    if (output["MD5OfMessageSystemAttributes"] !== undefined) {
        contents.MD5OfMessageSystemAttributes = (0, smithy_client_1.expectString)(output["MD5OfMessageSystemAttributes"]);
    }
    if (output["MessageId"] !== undefined) {
        contents.MessageId = (0, smithy_client_1.expectString)(output["MessageId"]);
    }
    if (output["SequenceNumber"] !== undefined) {
        contents.SequenceNumber = (0, smithy_client_1.expectString)(output["SequenceNumber"]);
    }
    return contents;
};
const deserializeAws_queryStringList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return (0, smithy_client_1.expectString)(entry);
    });
};
const deserializeAws_queryTagMap = (output, context) => {
    return output.reduce((acc, pair) => {
        if (pair["Value"] === null) {
            return acc;
        }
        acc[pair["Key"]] = (0, smithy_client_1.expectString)(pair["Value"]);
        return acc;
    }, {});
};
const deserializeAws_queryTooManyEntriesInBatchRequest = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeAws_queryUnsupportedOperation = (output, context) => {
    const contents = {};
    return contents;
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_1.HttpRequest(contents);
};
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        const parser = new fast_xml_parser_1.XMLParser({
            attributeNamePrefix: "",
            htmlEntities: true,
            ignoreAttributes: false,
            ignoreDeclaration: true,
            parseTagValue: false,
            trimValues: false,
            tagValueProcessor: (_, val) => (val.trim() === "" && val.includes("\n") ? "" : undefined),
        });
        parser.addEntity("#xD", "\r");
        parser.addEntity("#10", "\n");
        const parsedObj = parser.parse(encoded);
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
            parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
            delete parsedObjToReturn[textNodeName];
        }
        return (0, smithy_client_1.getValueFromTextNode)(parsedObjToReturn);
    }
    return {};
});
const parseErrorBody = async (errorBody, context) => {
    const value = await parseBody(errorBody, context);
    if (value.Error) {
        value.Error.message = value.Error.message ?? value.Error.Message;
    }
    return value;
};
const buildFormUrlencodedString = (formEntries) => Object.entries(formEntries)
    .map(([key, value]) => (0, smithy_client_1.extendedEncodeURIComponent)(key) + "=" + (0, smithy_client_1.extendedEncodeURIComponent)(value))
    .join("&");
const loadQueryErrorCode = (output, data) => {
    if (data.Error?.Code !== undefined) {
        return data.Error.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
};
