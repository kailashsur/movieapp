
import jwt from 'jsonwebtoken';

//here user means user schema of the User 
const formateDatatoSend = (newUser : any) => {
    const access_token = jwt.sign({ id: newUser.id }, process.env.SECRET_ACCESS_KEY as string);

    return {
        id : newUser.id,
        admin: newUser.admin,
        access_token,
        profile_img: newUser.profile_img,
        name : newUser.name,
        email : newUser.email,
        createdAt : newUser.createdAt,
    }
}

export default formateDatatoSend;