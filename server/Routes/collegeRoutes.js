import express from 'express'
import { AddCollege, AddOrganiser, DeleteCollege, DeleteOrganiser, getDonarsAndOrganisersInTheCollege, UpdateCollege, UpdateOrganiser } from '../controllers/collegeControllers.js';
import {userAuth} from '../middleware/userAuth.js'
const Collegerouter=express.Router();

//For ADMIN to Manupualte college
Collegerouter.post('/addcollege',AddCollege)
Collegerouter.delete('/deletecollege',DeleteCollege);
Collegerouter.put('/updatecollege',UpdateCollege);



//FOR COLLEGE TO SEE THE ORGANISERS AND DONARS IN THE COLLEGE

Collegerouter.get('/get-donor-organiser',userAuth,getDonarsAndOrganisersInTheCollege)



//For Manupulating Organisers
Collegerouter.post('/addorganiser',userAuth,AddOrganiser);
Collegerouter.post('/deleteorganiser',userAuth,DeleteOrganiser);
Collegerouter.put('/updateorganiser',userAuth,UpdateOrganiser);
export default Collegerouter