import fs from "fs";
import path from "path";
import { cwd } from "process";

export function buildpath() {
  return path.join(process.cwd(), "data", "dummy.json");
}
export function getFileData(filepath) {
  const fileData = fs.readFileSync(filepath);
  const data = JSON.parse(fileData);
  return data;
}
function handler(req, res) {
  if (req.method === "POST") {
    const recemail = req.body.reqbody.email;
    const recfeedback = req.body.reqbody.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: recemail,
      feedback: recfeedback,
    };
    const filepath = buildpath();
    const data = getFileData(filepath);
    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data));
    res.status(201).json({ message: "success", feedback: newFeedback });
  } else {
    const filepath = buildpath();
    const data = getFileData(filepath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
