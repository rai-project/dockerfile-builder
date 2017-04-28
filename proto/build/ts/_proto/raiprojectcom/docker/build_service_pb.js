/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.exportSymbol('proto.raiprojectcom.docker.DockerBuildRequest', null, global);
goog.exportSymbol('proto.raiprojectcom.docker.DockerBuildResponse', null, global);
goog.exportSymbol('proto.raiprojectcom.docker.ErrorStatus', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.raiprojectcom.docker.DockerBuildRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.raiprojectcom.docker.DockerBuildRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.raiprojectcom.docker.DockerBuildRequest.displayName = 'proto.raiprojectcom.docker.DockerBuildRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.raiprojectcom.docker.DockerBuildRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.raiprojectcom.docker.DockerBuildRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.raiprojectcom.docker.DockerBuildRequest} msg The msg instance to transform.
 * @return {!Object}
 */
proto.raiprojectcom.docker.DockerBuildRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.raiprojectcom.docker.DockerBuildRequest}
 */
proto.raiprojectcom.docker.DockerBuildRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.raiprojectcom.docker.DockerBuildRequest;
  return proto.raiprojectcom.docker.DockerBuildRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.raiprojectcom.docker.DockerBuildRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.raiprojectcom.docker.DockerBuildRequest}
 */
proto.raiprojectcom.docker.DockerBuildRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.raiprojectcom.docker.DockerBuildRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.raiprojectcom.docker.DockerBuildRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.raiprojectcom.docker.DockerBuildRequest} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.raiprojectcom.docker.DockerBuildRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string content = 1;
 * @return {string}
 */
proto.raiprojectcom.docker.DockerBuildRequest.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.raiprojectcom.docker.DockerBuildRequest.prototype.setContent = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.raiprojectcom.docker.DockerBuildResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.raiprojectcom.docker.DockerBuildResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.raiprojectcom.docker.DockerBuildResponse.displayName = 'proto.raiprojectcom.docker.DockerBuildResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.raiprojectcom.docker.DockerBuildResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.raiprojectcom.docker.DockerBuildResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.raiprojectcom.docker.DockerBuildResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    content: jspb.Message.getFieldWithDefault(msg, 1, ""),
    error: (f = msg.getError()) && proto.raiprojectcom.docker.ErrorStatus.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.raiprojectcom.docker.DockerBuildResponse}
 */
proto.raiprojectcom.docker.DockerBuildResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.raiprojectcom.docker.DockerBuildResponse;
  return proto.raiprojectcom.docker.DockerBuildResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.raiprojectcom.docker.DockerBuildResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.raiprojectcom.docker.DockerBuildResponse}
 */
proto.raiprojectcom.docker.DockerBuildResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    case 2:
      var value = new proto.raiprojectcom.docker.ErrorStatus;
      reader.readMessage(value,proto.raiprojectcom.docker.ErrorStatus.deserializeBinaryFromReader);
      msg.setError(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.raiprojectcom.docker.DockerBuildResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.raiprojectcom.docker.DockerBuildResponse} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.raiprojectcom.docker.DockerBuildResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getError();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.raiprojectcom.docker.ErrorStatus.serializeBinaryToWriter
    );
  }
};


/**
 * optional string content = 1;
 * @return {string}
 */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.setContent = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional ErrorStatus error = 2;
 * @return {?proto.raiprojectcom.docker.ErrorStatus}
 */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.getError = function() {
  return /** @type{?proto.raiprojectcom.docker.ErrorStatus} */ (
    jspb.Message.getWrapperField(this, proto.raiprojectcom.docker.ErrorStatus, 2));
};


/** @param {?proto.raiprojectcom.docker.ErrorStatus|undefined} value */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.setError = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.raiprojectcom.docker.DockerBuildResponse.prototype.clearError = function() {
  this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.raiprojectcom.docker.DockerBuildResponse.prototype.hasError = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.raiprojectcom.docker.ErrorStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.raiprojectcom.docker.ErrorStatus.repeatedFields_, null);
};
goog.inherits(proto.raiprojectcom.docker.ErrorStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.raiprojectcom.docker.ErrorStatus.displayName = 'proto.raiprojectcom.docker.ErrorStatus';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.raiprojectcom.docker.ErrorStatus.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.raiprojectcom.docker.ErrorStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.raiprojectcom.docker.ErrorStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.raiprojectcom.docker.ErrorStatus} msg The msg instance to transform.
 * @return {!Object}
 */
proto.raiprojectcom.docker.ErrorStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, ""),
    detailsList: jspb.Message.toObjectList(msg.getDetailsList(),
    google_protobuf_any_pb.Any.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.raiprojectcom.docker.ErrorStatus}
 */
proto.raiprojectcom.docker.ErrorStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.raiprojectcom.docker.ErrorStatus;
  return proto.raiprojectcom.docker.ErrorStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.raiprojectcom.docker.ErrorStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.raiprojectcom.docker.ErrorStatus}
 */
proto.raiprojectcom.docker.ErrorStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = new google_protobuf_any_pb.Any;
      reader.readMessage(value,google_protobuf_any_pb.Any.deserializeBinaryFromReader);
      msg.addDetails(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.raiprojectcom.docker.ErrorStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.raiprojectcom.docker.ErrorStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.raiprojectcom.docker.ErrorStatus} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.raiprojectcom.docker.ErrorStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDetailsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      google_protobuf_any_pb.Any.serializeBinaryToWriter
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.raiprojectcom.docker.ErrorStatus.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.raiprojectcom.docker.ErrorStatus.prototype.setMessage = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated google.protobuf.Any details = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.google.protobuf.Any>}
 */
proto.raiprojectcom.docker.ErrorStatus.prototype.getDetailsList = function() {
  return /** @type{!Array.<!proto.google.protobuf.Any>} */ (
    jspb.Message.getRepeatedWrapperField(this, google_protobuf_any_pb.Any, 2));
};


/** @param {!Array.<!proto.google.protobuf.Any>} value */
proto.raiprojectcom.docker.ErrorStatus.prototype.setDetailsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.Any=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.Any}
 */
proto.raiprojectcom.docker.ErrorStatus.prototype.addDetails = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.Any, opt_index);
};


proto.raiprojectcom.docker.ErrorStatus.prototype.clearDetailsList = function() {
  this.setDetailsList([]);
};


goog.object.extend(exports, proto.raiprojectcom.docker);
