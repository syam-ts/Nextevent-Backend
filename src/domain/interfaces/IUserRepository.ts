export interface IUserRepository {
    signupUser: (
        fullname: string,
        emil: string,
        mobile: number,
        gender: string,
        country: string,
        state: string,
        language: string
    ) => Promise<any>;

    loginUser: (email: string, password: string) => Promise<any>;
}
