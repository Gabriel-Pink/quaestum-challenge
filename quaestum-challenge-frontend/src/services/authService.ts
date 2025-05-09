import { api } from "./api";

interface SignUpData {
    fullName: string;
    email: string;
    password: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface ResetPasswordData {
    id: string;
    newPassword: string;
}

export interface jobApplicationData {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    birthDate: string;
    educations: {
        courseName: string;
        institutionName: string;
        graduationDate: string;
    }[] | null;
    skills: string[];
}


export class AuthService {
    static async signUp(data: SignUpData) {
        try {
            const response = await api.post("/users/signup", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async signIn(data: SignInData) {
        try {
            const response = await api.post("/users/signin", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async jobApplication(data: jobApplicationData) {
        try {
            const response = await api.post("/job-application", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async resetPassword(data: ResetPasswordData) {
        try {
            const response = await api.put(`/users/reset-password/${data.id}`, {
                newPassword: data.newPassword,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async dashboard() {
        try {
            const response = await api.get("/dashboard");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}