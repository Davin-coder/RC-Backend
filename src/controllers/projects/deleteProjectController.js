import deleteProject from "../../models/projects/deleteProject.js";

const DeleteProjectController = {
    async delete(req, res) {
        const id_project_submissions = req.params.id;
        try {
            const deletedProject = await deleteProject(id_project_submissions);
            if (!deletedProject) {
                return res.status(404).json({
                    success: false,
                    msg: "Project not found",
                });
            }
            res.status(200).json({
                success: true,
                msg: "Project deleted successfully",
                project: deletedProject,
            });
        } catch (error) {
            console.error("DeleteProject Error:", error.message);
            res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    },
};

export default DeleteProjectController;
