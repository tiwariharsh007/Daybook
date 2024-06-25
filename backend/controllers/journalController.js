import { Journal } from "../models/journalSchema.js";

export const createJournal = async (req, res) => {
    try {
        const {title, description, id , date , image } = req.body;
        console.log(req.body);
        if (!description || !id || !title) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const journal = await Journal.create({
            title,
            description,
            date: date || new Date().toLocaleDateString(),
            image : image || "https://photosly.net/wp-content/uploads/2023/12/no-dp32.jpg",
            userId:id,
        });
        return res.status(201).json({
            message:"Journal created successfully.",
            journal,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteJournal = async (req,res) => {
    try {
        const {id}  = req.params;
        await Journal.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Journal deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    const journalId = req.params.id;

  try {
    const journal = await Journal.findById(journalId);
    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    // Toggle the isLike field
    journal.isLike = !journal.isLike;
    await journal.save();

    return res.status(200).json({
      message: `Journal entry ${journal.isLike ? 'liked' : 'disliked'} successfully`,
      journal,
    });
  } catch (error) {
        console.log(error);
    }
};


export const getAllJournals = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const allJournals = await Journal.find({userId:id});
        return res.status(200).json({
            message: 'All journals retrieved successfully',
            allJournals,
        })
    } catch (error) {
        console.log(error);
    }
};

export const getLikedJournals = async (req, res) => {
    try {
        const id = req.params.id;
      const likedJournals = await Journal.find({ userId:id,isLike: true });
      return res.status(200).json({
        message: 'Liked journals retrieved successfully',
        likedJournals,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };