
export interface IOrganizerRepository {
    signupOrganizer: (
        name: string,
        email: string,
        mobile: number,
        password: string,
        organizationName: string 
    ) => Promise<any>;

    loginOrganizer: (email: string, password: string) => Promise<any>;

 
    
}
