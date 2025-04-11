import express from 'express'
import { AddCollege, AddOrganiser, DeleteCollege, DeleteOrganiser, getAllcolleges, getAllPostByCollegeId, getCollegeIdByName, getDonarsAndOrganisersInTheCollege, UpdateCollege, UpdateOrganiser, updateProfilePic } from '../controllers/collegeControllers.js';
import {userAuth} from '../middleware/userAuth.js'
import { createPost, deletePost, getPostByOrganiserId, updatePost } from '../controllers/organiserControllers.js';
import upload from '../middleware/multer.js';
const Collegerouter=express.Router();

//For ADMIN to Manupualte college
Collegerouter.post('/addcollege',AddCollege)
Collegerouter.delete('/deletecollege',DeleteCollege);
Collegerouter.put('/updatecollege',UpdateCollege);



//FOR COLLEGE TO SEE THE ORGANISERS AND DONARS IN THE COLLEGE

Collegerouter.post('/get-donor-organiser',userAuth,getDonarsAndOrganisersInTheCollege)
Collegerouter.post('/getallposts',userAuth,getAllPostByCollegeId);



//For Manupulating Organisers
Collegerouter.post('/addorganiser',userAuth,AddOrganiser);
Collegerouter.post('/deleteorganiser',userAuth,DeleteOrganiser);
Collegerouter.put('/updateorganiser',userAuth,UpdateOrganiser);



//For creating and deleting posts by organiser
//FOR Organisers Use

Collegerouter.post('/createpost',userAuth,createPost);
Collegerouter.delete('/deletepost',userAuth,deletePost);
Collegerouter.put('/updatepost',userAuth,updatePost);
Collegerouter.get('/getmyposts',userAuth,getPostByOrganiserId);
Collegerouter.get('/getallcolleges',getAllcolleges);

//Update Profile Image

Collegerouter.post('/uploadprofile-pic',upload.single('image'),userAuth,updateProfilePic)



export default Collegerouter