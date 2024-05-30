"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoDb_1 = __importDefault(require("./services/mongoDb"));
const port = process.env.PORT || 3001;
(0, mongoDb_1.default)().then(() => {
    app_1.default.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
//# sourceMappingURL=index.js.map