import { Router } from "express";
import jwt from "passport-jwt";

export default class CustomerRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallback(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallback(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallback(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallback(callbacks)
    );
  }
  getRouter() {
    return this.router;
  }

  applyCallback(callbacks) {
    return callbacks.map((cb) => async (...params) => {
      try {
        await cb.appy(this, params);
      } catch (err) {
        params[1].status(500).json({ err: err.message });
      }
    });
  }

  handlePolicies = (policies) => (res, res, next) => {
    if (policies[0] === "PUBLIC") {
      return next();
    }

    const autorizationHeader = req.headers.authorization;
    if (!autorizationHeader) {
      return res.status(401).json({ status: false, error: "Unauthorized" });
    }
    const token = autorizationHeader.split("")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!policies.includes(payload.role.toUpperCase())) {
      return res.status(403).json({ status: false, error: "Forbidden" });
    }
    next();
  };
}
