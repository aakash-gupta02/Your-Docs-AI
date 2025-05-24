import Doc from "../models/DocSchema.js";

export const createDoc = async (req, res) => {
  try {
    const { title, content, isAnonymous } = req.body;

    // If user is logged in (auth middleware sets req.userId)
    const userId = req.user || null;

    const newDoc = new Doc({
      title,
      content,
      user: userId,
      isAnonymous: !userId || isAnonymous,
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    console.error("Doc creation failed:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allDoc = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const all = await Doc.find({ user: req.user });
    res.status(200).json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDoc = async (req, res) => {
  const { id } = req.params;
  try {
    const existingDoc = await Doc.findById(id);

    if (!existingDoc) {
      return res.status(404).json({ message: "Docs not Found" });
    }

    const deleteDoc = await Doc.findByIdAndDelete(id);
    res.status(201).json({ message: "Docs Deleted Succesfully", deleteDoc });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
};

export const updateDoc = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const existingDoc = await Doc.findById(id);

    if (!existingDoc) {
      return res.status(404).json({ message: "Docs not Found" });
    }

    const updatedDoc = await Doc.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({ message: "updated Successfully", updatedDoc });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
};

export const oneDoc = async (req, res)=>{
  const {id} = req.params
  console.log(id);
  

  try {
    const oneDoc = await Doc.findById(id)

    if(!oneDoc){
      return res.status(400).json({message:"No Doc Found"})
    }

    res.status(200).json(oneDoc)

    
    
    

  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
}