import updateTemplate from "../../models/templates/updateTemplateModels.js";

const UpdateTemplateController = {
  async update(req, res) {
    try {
      const id_template = req.params.id;
      const { title, project_description } = req.body;
      // Validación sencilla: al menos un campo para actualizar
      if (title === undefined && project_description === undefined) {
        return res.status(400).json({
          success: false,
          error: true,
          msg: "At least one field (title, project_description) must be provided",
        });
      }
      const updatedTemplate = await updateTemplate(id_template, {
        title,
        project_description,
      });
      if (!updatedTemplate) {
        return res.status(404).json({
          success: false,
          error: true,
          msg: "Template not found",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Template updated successfully",
        template: updatedTemplate,
      });
    } catch (error) {
      console.error("UpdateTemplate Error:", error.message);
      return res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later",
      });
    }
  },
};

export default UpdateTemplateController;
