import Record from "../models/Record.js";

export const createRecord = async (req, res) => {
  let imageBase64 = null;

  if (req.file) {
    imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  }

  const record = await Record.create({
    serialNo: req.body.serialNo,
    name: req.body.name,
    vcNo: req.body.vcNo,
    address: req.body.address,
    phone: req.body.phone,
    image: imageBase64
  });

  res.json(record);
};

export const getRecords = async (_, res) => {
  res.json(await Record.find());
};

export const updateRecord = async (req, res) => {
  const update = { ...req.body };
  if (req.file) update.image = req.file.filename;

  res.json(
    await Record.findByIdAndUpdate(req.params.id, update, { new: true })
  );
};

export const deleteRecord = async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
