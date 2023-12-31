import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res)=>{
    const {id} = req.params;
    try {
        const post  =await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }       
}

export const getPosts = async (req, res)=>{
    const{page} = req.query;
    console.log("get me hun");

    try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1)*LIMIT; // getting the starting index of the page  
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
        

    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})       
    }

}
export const getPostsBySearch = async(req, res)=>{
    const {searchQuery, tags} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        console.log(title);
        const posts = await PostMessage.find( { $or : [  { title } , { tags: {$in : tags.split(',') } } ]});
        return res.status(200).json({data: posts});
    } catch (error) {
        return res.status(404).json({message: error.message});
        
    }
}
export const createPost = async (req, res)=>{
    const post = req.body;
    console.log("create wala"+req.userId);
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error);
        res.status(409).json({message : error.message})
    }
}
export const updatePost = async( req, res)=>{
    const {id: _id}= req.params ;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no post with id')

    const updatedPost = await  PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true} )
    
    res.json(updatedPost)
}

export const deletePost = async(req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('no post with id')
    }
    console.log(id);
    await PostMessage.findByIdAndRemove(id)
    res.json({message: 'Post is deleted Successfully'})
}    

export const likePost = async(req, res)=>{
    console.log("like me agya");
    const {id} = req.params
    console.log(req.userId);
    if(!req.userId) return res.json({message:'unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('no post with id')
    } 
   
    const post = await PostMessage.findById(id);
    // check whether the user id is in liked Section or not 
    const index = post.likes.findIndex((id)=> id === String(req.userId))
    if(index === -1){
        // user can like the post
        post.likes.push(req.userId)
    }else{
        // user can dislike the post 
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true})
    console.log("like the post");
    return res.status(200).json(updatedPost)
}

export const commentPost = async (req,res)=>{
        const {id} = req.params;
        const {comment} = req.body;

        const post = await PostMessage.findById(id);
        
        post.comments.push(comment);

        const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new : true});

        res.status(200).json(updatePost);
}