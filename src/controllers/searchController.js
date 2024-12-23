const Property = require('../models/Property');

// Search properties with filters, pagination, and sorting
exports.searchProperties = async (req, res) => {
  const { location, minPrice, maxPrice, propertyType, amenities, sortBy, sortOrder, limit, page } = req.query;

  try {
    // Build dynamic query object
    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' }; // Case-insensitive match
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    if (propertyType) query.propertyType = propertyType;
    if (amenities) query.amenities = { $all: amenities.split(',') };

    // Default values for pagination and sorting
    const pageNum = parseInt(page) || 1; // Current page number
    const pageSize = parseInt(limit) || 10; // Results per page
    const sortField = sortBy || 'createdAt';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Fetch properties with pagination and sorting
    const properties = await Property.find(query)
      .sort({ [sortField]: sortDirection }) // Sort dynamically
      .skip((pageNum - 1) * pageSize) // Skip for pagination
      .limit(pageSize); // Limit results per page

    // Count total properties for pagination metadata
    const totalProperties = await Property.countDocuments(query);

    res.status(200).json({
      total: totalProperties,
      page: pageNum,
      pageSize: pageSize,
      properties: properties,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};
