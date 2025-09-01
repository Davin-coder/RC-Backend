// src/controllers/projectTemplates/deleteTemplateController.js
import deleteTemplate from "../../models/templates/deleteTemplateModels.js";

const DeleteTemplateController = {
  async delete(req, res) {
    const id_template = req.params.id;
    try {
      const deletedTemplate = await deleteTemplate(id_template);
      if (!deletedTemplate) {
        return res.status(404).json({
          success: false,
          msg: "Template not found",
        });
      }
      res.status(200).json({
        success: true,
        msg: "Template deleted successfully",
        template: deletedTemplate,
      });
    } catch (error) {
      console.error("DeleteTemplate Error:", error.message);
      res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later",
      });
    }
  },
};

export default DeleteTemplateController;
