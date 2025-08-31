import getOneProject from "../../models/projects/getOneProject.js";

const GetOneProjectController = {
    async getOne(req, res) {
        try {
            const id_project_submissions = req.params.id;
            const project = await getOneProject(id_project_submissions);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Project not found",
                });
            }

            res.status(200).json({
                success: true,
                msg: "Project retrieved successfully",
                project,
            });
        } catch (error) {
            console.error("GetOneProject Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default GetOneProjectController;
