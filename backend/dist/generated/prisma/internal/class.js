"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum FuelType {\n  GASOLINA\n  ETANOL\n  FLEX\n  DIESEL\n  GNV\n  ELETRICO\n  HIBRIDO\n}\n\nenum VehicleType {\n  CARRO\n  MOTO\n  CAMINHONETE\n  CAMINHAO\n  ONIBUS\n  OUTRO\n}\n\nmodel User {\n  id           String    @id @default(uuid())\n  name         String    @db.VarChar(150)\n  email        String    @unique @db.VarChar(255)\n  passwordHash String    @map(\"password_hash\") @db.VarChar(255)\n  vehicles     Vehicle[]\n  createdAt    DateTime  @default(now()) @map(\"created_at\")\n  updatedAt    DateTime  @updatedAt @map(\"updated_at\")\n\n  @@map(\"users\")\n}\n\nmodel Vehicle {\n  id              String      @id @default(uuid())\n  imageUrl        String?     @map(\"image_url\") @db.VarChar(500)\n  plate           String      @unique @db.VarChar(7)\n  chassis         String      @unique @db.VarChar(17)\n  renavam         String      @unique @db.VarChar(11)\n  brand           String      @db.VarChar(100)\n  model           String      @db.VarChar(100)\n  manufactureYear Int         @map(\"manufacture_year\")\n  modelYear       Int         @map(\"model_year\")\n  color           String      @db.VarChar(50)\n  fuel            FuelType\n  type            VehicleType\n  nickname        String?     @db.VarChar(100)\n\n  userId String @map(\"user_id\")\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@index([userId])\n  @@map(\"vehicles\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"password_hash\"},{\"name\":\"vehicles\",\"kind\":\"object\",\"type\":\"Vehicle\",\"relationName\":\"UserToVehicle\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"users\",\"schema\":null},\"Vehicle\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"image_url\"},{\"name\":\"plate\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"chassis\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"renavam\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"brand\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"model\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"manufactureYear\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"manufacture_year\"},{\"name\":\"modelYear\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"model_year\"},{\"name\":\"color\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fuel\",\"kind\":\"enum\",\"type\":\"FuelType\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"VehicleType\"},{\"name\":\"nickname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToVehicle\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"vehicles\",\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"vehicles\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Vehicle.findUnique\",\"Vehicle.findUniqueOrThrow\",\"Vehicle.findFirst\",\"Vehicle.findFirstOrThrow\",\"Vehicle.findMany\",\"Vehicle.createOne\",\"Vehicle.createMany\",\"Vehicle.createManyAndReturn\",\"Vehicle.updateOne\",\"Vehicle.updateMany\",\"Vehicle.updateManyAndReturn\",\"Vehicle.upsertOne\",\"Vehicle.deleteOne\",\"Vehicle.deleteMany\",\"_avg\",\"_sum\",\"Vehicle.groupBy\",\"Vehicle.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"imageUrl\",\"plate\",\"chassis\",\"renavam\",\"brand\",\"model\",\"manufactureYear\",\"modelYear\",\"color\",\"FuelType\",\"fuel\",\"VehicleType\",\"type\",\"nickname\",\"userId\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"name\",\"email\",\"passwordHash\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "exQgCgQAAE4AIC4AAEsAMC8AAAkAEDAAAEsAMDEBAAAAAUFAAE0AIUJAAE0AIU4BAEwAIU8BAAAAAVABAEwAIQEAAAABACAUAwAAVAAgLgAATwAwLwAAAwAQMAAATwAwMQEATAAhMgEAUAAhMwEATAAhNAEATAAhNQEATAAhNgEATAAhNwEATAAhOAIAUQAhOQIAUQAhOgEATAAhPAAAUjwiPgAAUz4iPwEAUAAhQAEATAAhQUAATQAhQkAATQAhAwMAAHUAIDIAAFUAID8AAFUAIBQDAABUACAuAABPADAvAAADABAwAABPADAxAQAAAAEyAQBQACEzAQAAAAE0AQAAAAE1AQAAAAE2AQBMACE3AQBMACE4AgBRACE5AgBRACE6AQBMACE8AABSPCI-AABTPiI_AQBQACFAAQBMACFBQABNACFCQABNACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAKBAAATgAgLgAASwAwLwAACQAQMAAASwAwMQEATAAhQUAATQAhQkAATQAhTgEATAAhTwEATAAhUAEATAAhAQQAAHQAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAcEAABzACAxAQAAAAFBQAAAAAFCQAAAAAFOAQAAAAFPAQAAAAFQAQAAAAEBCwAADgAgBjEBAAAAAUFAAAAAAUJAAAAAAU4BAAAAAU8BAAAAAVABAAAAAQELAAAQADABCwAAEAAwBwQAAGYAIDEBAFsAIUFAAGAAIUJAAGAAIU4BAFsAIU8BAFsAIVABAFsAIQIAAAABACALAAATACAGMQEAWwAhQUAAYAAhQkAAYAAhTgEAWwAhTwEAWwAhUAEAWwAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAAYwAgGAAAZQAgGQAAZAAgCS4AAEoAMC8AABwAEDAAAEoAMDEBADYAIUFAADsAIUJAADsAIU4BADYAIU8BADYAIVABADYAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACARAwAAYgAgMQEAAAABMgEAAAABMwEAAAABNAEAAAABNQEAAAABNgEAAAABNwEAAAABOAIAAAABOQIAAAABOgEAAAABPAAAADwCPgAAAD4CPwEAAAABQAEAAAABQUAAAAABQkAAAAABAQsAACQAIBAxAQAAAAEyAQAAAAEzAQAAAAE0AQAAAAE1AQAAAAE2AQAAAAE3AQAAAAE4AgAAAAE5AgAAAAE6AQAAAAE8AAAAPAI-AAAAPgI_AQAAAAFAAQAAAAFBQAAAAAFCQAAAAAEBCwAAJgAwAQsAACYAMBEDAABhACAxAQBbACEyAQBcACEzAQBbACE0AQBbACE1AQBbACE2AQBbACE3AQBbACE4AgBdACE5AgBdACE6AQBbACE8AABePCI-AABfPiI_AQBcACFAAQBbACFBQABgACFCQABgACECAAAABQAgCwAAKQAgEDEBAFsAITIBAFwAITMBAFsAITQBAFsAITUBAFsAITYBAFsAITcBAFsAITgCAF0AITkCAF0AIToBAFsAITwAAF48Ij4AAF8-Ij8BAFwAIUABAFsAIUFAAGAAIUJAAGAAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBwUAAFYAIBgAAFkAIBkAAFgAICoAAFcAICsAAFoAIDIAAFUAID8AAFUAIBMuAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyAQA3ACEzAQA2ACE0AQA2ACE1AQA2ACE2AQA2ACE3AQA2ACE4AgA4ACE5AgA4ACE6AQA2ACE8AAA5PCI-AAA6PiI_AQA3ACFAAQA2ACFBQAA7ACFCQAA7ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIBMuAAA1ADAvAAAyABAwAAA1ADAxAQA2ACEyAQA3ACEzAQA2ACE0AQA2ACE1AQA2ACE2AQA2ACE3AQA2ACE4AgA4ACE5AgA4ACE6AQA2ACE8AAA5PCI-AAA6PiI_AQA3ACFAAQA2ACFBQAA7ACFCQAA7ACEOBQAAPQAgGAAASQAgGQAASQAgQwEAAAABRAEAAAAERQEAAAAERgEAAAABRwEAAAABSAEAAAABSQEAAAABSgEASAAhSwEAAAABTAEAAAABTQEAAAABDgUAAEYAIBgAAEcAIBkAAEcAIEMBAAAAAUQBAAAABUUBAAAABUYBAAAAAUcBAAAAAUgBAAAAAUkBAAAAAUoBAEUAIUsBAAAAAUwBAAAAAU0BAAAAAQ0FAAA9ACAYAAA9ACAZAAA9ACAqAABEACArAAA9ACBDAgAAAAFEAgAAAARFAgAAAARGAgAAAAFHAgAAAAFIAgAAAAFJAgAAAAFKAgBDACEHBQAAPQAgGAAAQgAgGQAAQgAgQwAAADwCRAAAADwIRQAAADwISgAAQTwiBwUAAD0AIBgAAEAAIBkAAEAAIEMAAAA-AkQAAAA-CEUAAAA-CEoAAD8-IgsFAAA9ACAYAAA-ACAZAAA-ACBDQAAAAAFEQAAAAARFQAAAAARGQAAAAAFHQAAAAAFIQAAAAAFJQAAAAAFKQAA8ACELBQAAPQAgGAAAPgAgGQAAPgAgQ0AAAAABREAAAAAERUAAAAAERkAAAAABR0AAAAABSEAAAAABSUAAAAABSkAAPAAhCEMCAAAAAUQCAAAABEUCAAAABEYCAAAAAUcCAAAAAUgCAAAAAUkCAAAAAUoCAD0AIQhDQAAAAAFEQAAAAARFQAAAAARGQAAAAAFHQAAAAAFIQAAAAAFJQAAAAAFKQAA-ACEHBQAAPQAgGAAAQAAgGQAAQAAgQwAAAD4CRAAAAD4IRQAAAD4ISgAAPz4iBEMAAAA-AkQAAAA-CEUAAAA-CEoAAEA-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-AABTPiI_AQBQACFAAQBMACFBQABNACFCQABNACECAAAABQAgCwAAcQAgAgAAAG8AIAsAAHAAIBMuAABuADAvAABvABAwAABuADAxAQBMACEyAQBQACEzAQBMACE0AQBMACE1AQBMACE2AQBMACE3AQBMACE4AgBRACE5AgBRACE6AQBMACE8AABSPCI-AABTPiI_AQBQACFAAQBMACFBQABNACFCQABNACETLgAAbgAwLwAAbwAQMAAAbgAwMQEATAAhMgEAUAAhMwEATAAhNAEATAAhNQEATAAhNgEATAAhNwEATAAhOAIAUQAhOQIAUQAhOgEATAAhPAAAUjwiPgAAUz4iPwEAUAAhQAEATAAhQUAATQAhQkAATQAhDzEBAFsAITIBAFwAITMBAFsAITQBAFsAITUBAFsAITYBAFsAITcBAFsAITgCAF0AITkCAF0AIToBAFsAITwAAF48Ij4AAF8-Ij8BAFwAIUFAAGAAIUJAAGAAIQ8xAQBbACEyAQBcACEzAQBbACE0AQBbACE1AQBbACE2AQBbACE3AQBbACE4AgBdACE5AgBdACE6AQBbACE8AABePCI-AABfPiI_AQBcACFBQABgACFCQABgACEPMQEAAAABMgEAAAABMwEAAAABNAEAAAABNQEAAAABNgEAAAABNwEAAAABOAIAAAABOQIAAAABOgEAAAABPAAAADwCPgAAAD4CPwEAAAABQUAAAAABQkAAAAABBBIAAGcAMFYAAGgAMFgAAGoAIFwAAGsAMAABBAAAdAAgDzEBAAAAATIBAAAAATMBAAAAATQBAAAAATUBAAAAATYBAAAAATcBAAAAATgCAAAAATkCAAAAAToBAAAAATwAAAA8Aj4AAAA-Aj8BAAAAAUFAAAAAAUJAAAAAAQYxAQAAAAFBQAAAAAFCQAAAAAFOAQAAAAFPAQAAAAFQAQAAAAECAAAAAQAgEgAAdwAgAwAAAAkAIBIAAHcAIBMAAHsAIAgAAAAJACALAAB7ACAxAQBbACFBQABgACFCQABgACFOAQBbACFPAQBbACFQAQBbACEGMQEAWwAhQUAAYAAhQkAAYAAhTgEAWwAhTwEAWwAhUAEAWwAhAgQGAgUAAwEDAAEBBAcAAAAAAwUACBgACRkACgAAAAMFAAgYAAkZAAoBAwABAQMAAQUFAA8YABIZABMqABArABEAAAAAAAUFAA8YABIZABMqABArABEGAgEHCAEICwEJDAEKDQEMDwENEQQOEgUPFAEQFgQRFwYUGAEVGQEWGgQaHQcbHgscHwIdIAIeIQIfIgIgIwIhJQIiJwQjKAwkKgIlLAQmLQ0nLgIoLwIpMAQsMw4tNBQ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map