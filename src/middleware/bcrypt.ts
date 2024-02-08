import bcrypt from 'bcryptjs'

const hashPass = async (password : any)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export default hashPass;