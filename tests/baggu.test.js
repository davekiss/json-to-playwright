"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const filePath = path_1.default.resolve(__dirname, "./baggu.json");
const data = fs_1.default.readFileSync(filePath, "utf8");
const jsonData = JSON.parse(data);
const snapshot = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./baggu.snapshot.js"), "utf8");
const snapshotActionsOnly = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "./baggu.snapshot.actionsOnly.js"), "utf8");
test("converts Baggu subscribe successfully", () => {
    expect((0, index_1.default)(jsonData)).toEqual(snapshot);
    expect((0, index_1.default)(jsonData, { actionsOnly: true })).toEqual(snapshotActionsOnly);
});
