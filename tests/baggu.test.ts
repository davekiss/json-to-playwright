import fs from "fs";
import path from "path";
import jsonToPlaywright from "../index";

const filePath = path.resolve(__dirname, "./baggu.json");

const data = fs.readFileSync(filePath, "utf8");
const jsonData = JSON.parse(data);

const snapshot = fs.readFileSync(
  path.resolve(__dirname, "./baggu.snapshot.js"),
  "utf8"
);

const snapshotActionsOnly = fs.readFileSync(
  path.resolve(__dirname, "./baggu.snapshot.actionsOnly.js"),
  "utf8"
);

test("converts Baggu subscribe successfully", () => {
  expect(jsonToPlaywright(jsonData)).toEqual(snapshot);
  expect(jsonToPlaywright(jsonData, { actionsOnly: true })).toEqual(snapshotActionsOnly)
});
