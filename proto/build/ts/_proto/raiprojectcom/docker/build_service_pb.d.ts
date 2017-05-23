// package: raiprojectcom.docker
// file: raiprojectcom/docker/build_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class DockerBuildRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DockerBuildRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DockerBuildRequest): DockerBuildRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DockerBuildRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DockerBuildRequest;
  static deserializeBinaryFromReader(message: DockerBuildRequest, reader: jspb.BinaryReader): DockerBuildRequest;
}

export namespace DockerBuildRequest {
  export type AsObject = {
    id: string,
    content: string,
  }
}

export class DockerBuildResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  hasError(): boolean;
  clearError(): void;
  getError(): ErrorStatus | undefined;
  setError(value?: ErrorStatus): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DockerBuildResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DockerBuildResponse): DockerBuildResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DockerBuildResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DockerBuildResponse;
  static deserializeBinaryFromReader(message: DockerBuildResponse, reader: jspb.BinaryReader): DockerBuildResponse;
}

export namespace DockerBuildResponse {
  export type AsObject = {
    id: string,
    content: string,
    error?: ErrorStatus.AsObject,
  }
}

export class ErrorStatus extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  clearDetailsList(): void;
  getDetailsList(): Array<google_protobuf_any_pb.Any>;
  setDetailsList(value: Array<google_protobuf_any_pb.Any>): void;
  addDetails(value?: google_protobuf_any_pb.Any, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorStatus): ErrorStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorStatus;
  static deserializeBinaryFromReader(message: ErrorStatus, reader: jspb.BinaryReader): ErrorStatus;
}

export namespace ErrorStatus {
  export type AsObject = {
    message: string,
    detailsList: Array<google_protobuf_any_pb.Any.AsObject>,
  }
}

