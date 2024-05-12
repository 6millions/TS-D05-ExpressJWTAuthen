import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../model/user';

const secretKey = 'secret';

class UserController {

    private users: User[] = []; // This array will hold user objects

    //constructor
    constructor() {
        this.users = [];
    }
    public register = (req: Request, res: Response): void => {
        const { username, password } = req.body;

        // checkif user already exists
        if (this.users.find(u => u.username === username)) {
            res.status(400).send('Username already exists');
            return;
        }

    // Create a new instance of User using the constructor
    const newUser = new User(Date.now().toString(), username, password);

        this.users.push(newUser);
        res.status(200).send('User registered successfully');
    }

    // login method
    public login = (req: Request, res: Response): void => {
        // destructuring username and password from request body
        const {username, password} = req.body;
         // For demo purposes, using a simple array to store user data
         const user = this.users.find(u => u.username === username && u.password === password);
         if (!user) {
             res.status(401).send('Invalid credentials');
             return;
         }

         // generate JWT Token
         const token = jwt.sign({ userId: user.id }, secretKey);

        // Set the generated token to the user object
         user.setToken(token);
         
         res.status(200).json({ token });

    }

    // validate token
    public validateToken = (req: Request, res: Response): void => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).send('No token provided');
            return;
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
                return;
            }
            res.status(200).json(decoded);
        });
    }
}

// Export instance of UserController
export default new UserController();