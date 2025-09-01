// src/controllers/projectTemplates/getAllTemplateController.js
import getAllTemplateModels from "../../models/project_templates/getAllTemplateModels.js";

const GetAllTemplateController = {
  async getAll(req, res) {
    try {
      const templates = await getAllTemplateModels.getAllTemplates();
      res.status(200).json({
        success: true,
        msg: "Templates retrieved successfully",
        templates,
      });
    } catch (error) {
      console.error("GetAllTemplates Error:", error.message);
      res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later",
      });
    }
  },
};

export default GetAllTemplateController;
