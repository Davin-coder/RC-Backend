import getAllProjectModels from "../../models/projects/getAllProjectModels.js";

const GetAllProjectController = {
    async getAll(req, res) {
        try {
            const projects = await getAllProjectModels.getAllProjects();
            res.status(200).json({
                success: true,
                msg: "Projects retrieved successfully",
                projects
            });
        } catch (error) {
            console.error("GetAllProjects Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later"
            });
        }
    }
};

export default GetAllProjectController;

