export type LoginCredentials = {
    email: string;
    password: string;
}

export type SignUpCredentials = {
    name: string;
    email: string;
    password: string;
}

export type GoogleLoginCredentials = {
   name?: string;
   email: string;
   googleId?: string;
   avatar?: string;
   password?: string;
}