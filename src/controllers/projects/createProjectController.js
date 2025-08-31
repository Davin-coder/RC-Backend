import createProject from "../../models/projects/createProject.js";

const CreateProjectController = {
    async create(req, res) {
        try {
            const { id_template, id_user, id_group, repo_url, demo_url, screenshots, notes } = req.body;

            // Validaciones básicas
            if (!id_template || typeof id_template !== "number") {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "id_template is required and must be a number",
                });
            }

            if ((id_user && id_group) || (!id_user && !id_group)) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    msg: "You must provide either id_user or id_group, but not both",
                });
            }

            // Crear proyecto
            const project = await createProject({
                id_template,
                id_user: id_user ?? null,
                id_group: id_group ?? null,
                repo_url: repo_url ?? null,
                demo_url: demo_url ?? null,
                screenshots: screenshots ?? null,
                notes: notes ?? null,
            });

            return res.status(201).json({
                success: true,
                msg: "Project created successfully",
                project,
            });
        } catch (error) {
            console.error("CreateProject Error:", error.message);
            return res.status(500).json({
                success: false,
                error: true,
                msg: "Internal server error, try later",
            });
        }
    }
};

export default CreateProjectController;
