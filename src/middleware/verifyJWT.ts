
// import jwt from 'jsonwebtoken';
// import { NextRequest, NextResponse } from 'next/server';

// interface CustomNextApiRequest extends NextRequest {
//     user?: any; // Define the user property
// }

// const verifyJWT = (req: CustomNextApiRequest, res: NextResponse, next: () => void) => {
//     const authHeader = req.headers.get('authorization');
//     const token = authHeader && authHeader.split(" ")[1];
    
//     if (!token) {
//         console.log("Unauthorized");
        
//         return NextResponse.json({ status : 401, error: "No access token" });
//     }

//     jwt.verify(token, process.env.SECRET_ACCESS_KEY as string, (err, decoded) => {
//         if (err) {
//             return NextResponse.json({ status : 403, error: "Access token is invalid" });
//         }
// console.log("Authorized");

//         req.user = (decoded as { id: string }).id;
//         next();
//     });
// };

// export default verifyJWT;



// ---------------
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

interface CustomNextApiRequest extends NextRequest {
    user?: any; // Define the user property
}

const verifyJWT = (req: CustomNextApiRequest, res: NextResponse): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const authHeader = req.headers.get('authorization');
        const token = authHeader && authHeader.split(" ")[1];
        
        if (!token) {
            console.log("Unauthorized");
            reject({ status : 401, error: "No access token" });
        } else {
            jwt.verify(token as string, process.env.SECRET_ACCESS_KEY as string, (err, decoded) => {
                if (err) {
                    reject({ status : 403, error: "Access token is invalid" });
                } else {
                    console.log("Authorized");
                    req.user = (decoded as { id: string }).id;
                    resolve();
                }
            });
        }
    });
};


export default verifyJWT;

