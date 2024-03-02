const httpStatus=require('http-status');
const ApiError=require('../utils/ApiError');
const catchAsync=require('../utils/catchAsync')
const {videoService}=require('../services');


const getVideos = catchAsync(async (req, res) => {
    const title = req.query.title ? req.query.title : "";
    const genres = req.query.genres ? req.query.genres : "";
    const contentRating = req.query.contentRating ? req.query.contentRating : "";
    const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

    const videos = await videoService.getVideos(title,contentRating,genres,sortBy);
    return res.status(httpStatus.OK).send({"videos" : videos});
  });


  const getVideoById = catchAsync(async(req,res)=>{
    const video=await videoService.getVideoById((req.params.videoId));
    return res.json(video);
  });
  
  const addNewVideo=catchAsync(async(req, res)=>{
    const {title, videoLink, genre, contentRating, releaseDate, previewImage}=req.body;
    const video = await videoService.addNewVideo(
        title, videoLink, genre, contentRating, releaseDate, previewImage
    );
    return res.status(httpStatus.CREATED).send(video);
  });

  const addViews= catchAsync(async(req, res)=>{
    const {videoId}=req.params;
    await videoService.changeViews(videoId);
    res.status(httpStatus.NO_CONTENT).send();

  });

  const changeVotes = catchAsync(async(req,res)=>{
    const {videoId}= req.params;
    const {vote, change}=req.body;
    await videoService.updateRating(videoId, vote, change);
    return  res.status(httpStatus.NO_CONTENT).send();
  });

  module.exports={
    getVideos, getVideoById, addNewVideo, addViews, changeVotes
  }