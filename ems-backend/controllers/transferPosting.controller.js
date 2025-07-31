const TransferPosting = require("../models/transferPosting.model");

// Employee applies for transfer
exports.applyTransfer = async (req, res) => {
  try {
    const { currentDepartment, requestedDepartment, reason } = req.body;
    const transfer = await TransferPosting.create({
      employeeId: req.user.id,
      currentDepartment,
      requestedDepartment,
      reason,
    });
    res.status(201).json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee views own transfer requests
exports.getOwnTransfers = async (req, res) => {
  try {
    const transfers = await TransferPosting.findAll({ where: { employeeId: req.user.id } });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin views all requests
exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await TransferPosting.findAll();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin approves/rejects a request
exports.updateTransferStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const transfer = await TransferPosting.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ error: "Request not found" });

    transfer.status = status;
    await transfer.save();
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
