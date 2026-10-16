"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailField = void 0;
const zod_1 = require("zod");
exports.emailField = zod_1.z.string().trim().toLowerCase().pipe(zod_1.z.email({ message: 'Invalid email address' }));
//# sourceMappingURL=fields.js.map