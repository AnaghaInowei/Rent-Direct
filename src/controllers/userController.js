exports.getUser = (req, res) => {
    const userId = req.params.id;
    res.json({ message: 'Get user with ID: ${userId}' });
};

exports.createUser = (req, res) => {
    const userData = req.body;
    res.json({ message: 'User created successfully', data: userData });
};
