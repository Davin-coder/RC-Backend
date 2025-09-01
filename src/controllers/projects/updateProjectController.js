import updateProject from "../../models/projects/updateProjectModels.js";

const UpdateProjectController = {
    async update(req, res) {
        try {
            const id_project_submissions = req.params.id;
            const { repo_url, demo_url, screenshots, notes } = req.body;
            // Validación sencilla: al menos un campo para actualizar
            if (
                repo_url === undefined &&
                demo_url === undefined &&
                screenshots === undefined &&
                notes === undefined
            ) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "At least one field (repo_url, demo_url, screenshots, notes) must be provided",
                });
            }
            const updatedProject = await updateProject(id_project_submissions, {
                repo_url,
                demo_url,
                screenshots,
                notes,
            });
            if (!updatedProject) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    msg: "Project not found",
                });
            }
            return res.status(200).json({
                success: true,
                msg: "Project updated successfully",
                project: updatedProject,
            });
        } catch (error) {
            console.error("UpdateProject Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default UpdateProjectController;
