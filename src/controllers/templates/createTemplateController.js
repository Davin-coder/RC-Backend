// src/controllers/projectTemplates/createTemplateController.js
import createTemplate from "../../models/templates/createTemplateModels.js";

const CreateTemplateController = {
  async create(req, res) {
    try {
      const { title, project_description } = req.body;
      const template = await createTemplate({ title, project_description });

      return res.status(201).json({
        success: true,
        msg: "Template created successfully",
        template,
      });
    } catch (error) {
      console.error("CreateTemplate Error:", error.message);
      return res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later",
      });
    }
  },
};

export default CreateTemplateController;
