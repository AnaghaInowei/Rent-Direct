import property from "../models/Property";

const Property = require("../models/Property");

export async function property(req, res) {
    const{ title, description, location, price, propertyType, amenities, photos, videos} = req.body;

    try{
        const newProperty = new property({
            landlord: req.user.id,
            title,
            description,
            location,
            price,
            propertyType,
            amenities,
            photos,
            videos,
        });

        await property.save();
        res.status(201).json({message: 'Property listed successfully', property });
        
    }catch(error){
        res.status(401).json({ message: 'Error creating property listing', error});
    
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await property.find({ landlord: req.user.id });
        res.status(200).json(properties);
    } catch (error) {
       res.status(500).json({ message: 'Error fetching properties'}); 
    }
};

exports.updateProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await property.findById(id);
        if(!property || property.landlord.toString() !== req.user.id){
        res.status(404).json({ message: 'Property no found'});
        }
        const updateProperty = await property.findByIdAndUpdate(id, req.body, { new: true});
        res.status(200).json({ message: 'Property updated successfully', updateProperty });
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error});
    }

}

exports.deleteProperty = async (req, res) => {
    const{ id } = req.params;

    try {
        const property = await property.findById(id);
        if(!property || property.landlord.toString() != req.user.id); {
            return res.status(404).json({ message: 'Property not found'});
        }
        await property.remove();
        return res.status(200).json({ message: 'Propert deleted successfully'});
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting propert', error});
    }
};