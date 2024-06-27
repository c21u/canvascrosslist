"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQS = void 0;
const AddPermissionCommand_1 = require("./commands/AddPermissionCommand");
const ChangeMessageVisibilityBatchCommand_1 = require("./commands/ChangeMessageVisibilityBatchCommand");
const ChangeMessageVisibilityCommand_1 = require("./commands/ChangeMessageVisibilityCommand");
const CreateQueueCommand_1 = require("./commands/CreateQueueCommand");
const DeleteMessageBatchCommand_1 = require("./commands/DeleteMessageBatchCommand");
const DeleteMessageCommand_1 = require("./commands/DeleteMessageCommand");
const DeleteQueueCommand_1 = require("./commands/DeleteQueueCommand");
const GetQueueAttributesCommand_1 = require("./commands/GetQueueAttributesCommand");
const GetQueueUrlCommand_1 = require("./commands/GetQueueUrlCommand");
const ListDeadLetterSourceQueuesCommand_1 = require("./commands/ListDeadLetterSourceQueuesCommand");
const ListQueuesCommand_1 = require("./commands/ListQueuesCommand");
const ListQueueTagsCommand_1 = require("./commands/ListQueueTagsCommand");
const PurgeQueueCommand_1 = require("./commands/PurgeQueueCommand");
const ReceiveMessageCommand_1 = require("./commands/ReceiveMessageCommand");
const RemovePermissionCommand_1 = require("./commands/RemovePermissionCommand");
const SendMessageBatchCommand_1 = require("./commands/SendMessageBatchCommand");
const SendMessageCommand_1 = require("./commands/SendMessageCommand");
const SetQueueAttributesCommand_1 = require("./commands/SetQueueAttributesCommand");
const TagQueueCommand_1 = require("./commands/TagQueueCommand");
const UntagQueueCommand_1 = require("./commands/UntagQueueCommand");
const SQSClient_1 = require("./SQSClient");
class SQS extends SQSClient_1.SQSClient {
    addPermission(args, optionsOrCb, cb) {
        const command = new AddPermissionCommand_1.AddPermissionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    changeMessageVisibility(args, optionsOrCb, cb) {
        const command = new ChangeMessageVisibilityCommand_1.ChangeMessageVisibilityCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    changeMessageVisibilityBatch(args, optionsOrCb, cb) {
        const command = new ChangeMessageVisibilityBatchCommand_1.ChangeMessageVisibilityBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createQueue(args, optionsOrCb, cb) {
        const command = new CreateQueueCommand_1.CreateQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteMessage(args, optionsOrCb, cb) {
        const command = new DeleteMessageCommand_1.DeleteMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteMessageBatch(args, optionsOrCb, cb) {
        const command = new DeleteMessageBatchCommand_1.DeleteMessageBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteQueue(args, optionsOrCb, cb) {
        const command = new DeleteQueueCommand_1.DeleteQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getQueueAttributes(args, optionsOrCb, cb) {
        const command = new GetQueueAttributesCommand_1.GetQueueAttributesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getQueueUrl(args, optionsOrCb, cb) {
        const command = new GetQueueUrlCommand_1.GetQueueUrlCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listDeadLetterSourceQueues(args, optionsOrCb, cb) {
        const command = new ListDeadLetterSourceQueuesCommand_1.ListDeadLetterSourceQueuesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listQueues(args, optionsOrCb, cb) {
        const command = new ListQueuesCommand_1.ListQueuesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listQueueTags(args, optionsOrCb, cb) {
        const command = new ListQueueTagsCommand_1.ListQueueTagsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    purgeQueue(args, optionsOrCb, cb) {
        const command = new PurgeQueueCommand_1.PurgeQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    receiveMessage(args, optionsOrCb, cb) {
        const command = new ReceiveMessageCommand_1.ReceiveMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    removePermission(args, optionsOrCb, cb) {
        const command = new RemovePermissionCommand_1.RemovePermissionCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    sendMessage(args, optionsOrCb, cb) {
        const command = new SendMessageCommand_1.SendMessageCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    sendMessageBatch(args, optionsOrCb, cb) {
        const command = new SendMessageBatchCommand_1.SendMessageBatchCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    setQueueAttributes(args, optionsOrCb, cb) {
        const command = new SetQueueAttributesCommand_1.SetQueueAttributesCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    tagQueue(args, optionsOrCb, cb) {
        const command = new TagQueueCommand_1.TagQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    untagQueue(args, optionsOrCb, cb) {
        const command = new UntagQueueCommand_1.UntagQueueCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.SQS = SQS;
