import AuthService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ success: true, token });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

export const me = async (req, res) => {
  res.json({ success: true, user: req.user });
};
