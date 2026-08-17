const requireAdmin = (req, res, next) => {
    if (!req.rootUser || req.rootUser.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
};

module.exports = requireAdmin;
