export interface IUserRepository {
    signupUser: (
        fullName: string,
        email: string,
        mobile: number,
        password: string,
        gender: string,
        country: string,
        state: string,
        language: string
    ) => Promise<any>;

    loginUser: (email: string, password: string) => Promise<any>;

    updateUser: (
        userId: string,
        fullName: string,
        mobile: number,
        gender: string,
        country: string,
        state: string,
        language: string
    ) => Promise<any>;
}
