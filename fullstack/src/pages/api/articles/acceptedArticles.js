import dbConnect from '../../../../lib/dbConnect';
import AcceptedArticle from '../../../../models/AcceptedArticle';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Get the article ID from query params
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const newArticle = await AcceptedArticle.create(req.body);
        res.status(201).json({ success: true, data: newArticle });
      } catch (error) {
        console.error('Error creating accepted article:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'GET':
      const { status } = req.query; // Get status from query parameters

      // Convert the status query parameter to an array if it exists, otherwise use an empty array
      const statusArray = status ? status.split(',') : [];

      try {
        // Find articles where the status is in the statusArray
        const articles = await AcceptedArticle.find({ status: { $in: statusArray } }).select(
          'title authors journal year doi abstract keywords status researchMethod participants supportsPractice conclusion createdAt'
        );
        res.status(200).json({ success: true, data: articles });
      } catch (error) {
        console.error('Error retrieving articles:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query; // Ensure `id` is extracted from the query

        // Check if the ID is provided
        if (!id) {
          return res.status(400).json({ success: false, message: 'Article ID is required for updates' });
        }

        // Destructure and validate the fields from the request body
        const { status, researchMethod, participants, supportsPractice, conclusion } = req.body;

        // Validate that at least one field is being updated
        if (!status && !researchMethod && !participants && !supportsPractice && !conclusion) {
          return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        // Prepare the fields to update dynamically
        const updateFields = {};
        if (status) updateFields.status = status;
        if (researchMethod) updateFields.researchMethod = researchMethod;
        if (participants) updateFields.participants = participants;
        if (supportsPractice) updateFields.supportsPractice = supportsPractice;
        if (conclusion) updateFields.conclusion = conclusion;

        // Update only the specified fields in the document
        const updatedArticle = await AcceptedArticle.findByIdAndUpdate(
          id,
          updateFields,
          {
            new: true,
            runValidators: true,
          }
        );

        // Check if the article exists
        if (!updatedArticle) {
          return res.status(404).json({ success: false, message: 'Article not found' });
        }

        // Successfully updated
        res.status(200).json({ success: true, data: updatedArticle });
      } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the article', error: error.message });
      }
      break;


    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
