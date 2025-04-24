const Paper = require("../models/paper");

module.exports.uploadForm = (req, res) =>{
    console.log("Welcome to Question Bank");
    res.render("UploadPaperform");
}

module.exports.uploadPaper = async (req,res)=>{
    try{
        const {year, branch, semester, subject} = req.body;
        const url = req.file.path;
        const fileName = req.file.filename;
    
        const newPaper = new Paper({
            year,
            branch,
            semester,
            subject,
            cloudinaryUrl: url,
            publicId: fileName,
        });
       let savedPaper =  await newPaper.save();
        res.status(201).json({
            message: "Paper uploaded and saved successfully!",
            paper: savedPaper,
        });
    }catch(err) {
        console.log("error saving paper:", err.message);
        res.status(500).json({ error: "Failed to upload and save paper"});
    }
    }

    module.exports.getPaper = async (req, res) => {
        try {
          const filter = {};
          if (req.query.year) filter.year = req.query.year;
          if (req.query.branch) filter.branch = req.query.branch;
          if (req.query.semester) filter.semester = req.query.semester;
          if (req.query.subject) filter.subject = req.query.subject;
      
          const papers = await Paper.find(filter);
      
          const paperList = papers.map(paper => ({
            year: paper.year,
            branch: paper.branch,
            semester: paper.semester,
            subject: paper.subject,
            cloudinaryUrl: paper.cloudinaryUrl, 
            downloadUrl: paper.cloudinaryUrl,   
          }));
      
          res.status(200).json({
            success: true,
            data: paperList,
          });
      
        } catch (err) {
          console.log("Error fetching papers:", err);
          res.status(500).json({
            success: false,
            message: "Server Error"
          });
        }
      }