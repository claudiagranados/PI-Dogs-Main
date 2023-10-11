const { Dog } = require("../db");

const deleteDogByIdController = async (id) => {

    const dogDelete = await Dog.destroy({
        where:
        { id }
    });
    if (dogDelete) return `Dog with ${id}deleted from DB`;

    throw new Error (`Unable to delete dog with ID${id}`);
};

module.exports = {
    deleteDogByIdController,
}

