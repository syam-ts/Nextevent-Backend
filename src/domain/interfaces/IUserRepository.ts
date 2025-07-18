export interface IUserRepository {
    signupUser: (
        fullName: string,
        emil: string,
        mobile: number,
        password: string, 
        gender: string,
        country: string,
        state: string,
        language: string
    ) => Promise<any>;

    loginUser: (email: string, password: string) => Promise<any>;
}
