// src/controllers/projectTemplates/getOneTemplateController.js
import getOneTemplate from "../../models/project_templates/getOneTemplate.js";

const GetOneTemplateController = {
  async getOne(req, res) {
    try {
      const id_template = req.params.id;
      const template = await getOneTemplate(id_template);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: true,
          msg: "Template not found",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Template retrieved successfully",
        template,
      });
    } catch (error) {
      console.error("GetOneTemplate Error:", error.message);
      res.status(500).json({
        success: false,
        error: true,
        msg: "Internal server error, try later",
      });
    }
  },
};

export default GetOneTemplateController;
