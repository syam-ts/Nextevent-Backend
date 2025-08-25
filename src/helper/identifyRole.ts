 type Role = 'organizer' | 'guest';

export const identifyRole = (role: Readonly<Role>) => {
    if (role === "organizer") {
        return "organizer";
    } else if (role === "guest") {
        return "guest";
    } else {
        throw new Error("wrong role");
    }
};
