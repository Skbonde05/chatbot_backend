import TripPlanner from "../services/planner/tripPlanner.service.js";
import GiftPlanner from "../services/planner/giftPlanner.service.js";
import ThemePlanner from "../services/planner/themePlanner.service.js";

export const startTripPlanner = async (req, res) => {
  try {
    const out = await TripPlanner.start(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};

export const continueTripPlanner = async (req, res) => {
  try {
    const out = await TripPlanner.continue(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};

export const startGiftPlanner = async (req, res) => {
  try {
    const out = await GiftPlanner.start(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};

export const continueGiftPlanner = async (req, res) => {
  try {
    const out = await GiftPlanner.continue(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};

export const startThemePlanner = async (req, res) => {
  try {
    const out = await ThemePlanner.start(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};

export const continueThemePlanner = async (req, res) => {
  try {
    const out = await ThemePlanner.continue(req.user, req.body);
    res.json({ success: true, ...out });
  } catch (err) { res.status(400).json({ success:false, error:err.message }); }
};
