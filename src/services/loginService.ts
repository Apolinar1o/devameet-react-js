import { httpApiservices } from "./httpApiServices";

export class LoginServices extends httpApiservices {
    async login(body: any, setToken: any) {
        const {data} = await this.post("/auth/login", body)
        console.log(data)
        if(data) {
            localStorage.setItem("email", data.email)
            localStorage.setItem("token", data.token)

            const userResponse = await this.get("/user")

            if(userResponse && userResponse.data) {
                const user = userResponse.data;

                localStorage.setItem("id", user.id)
                localStorage.setItem("name", user.name)

                if(user.avatar) {
                    console.log(user)
                    localStorage.setItem("avatar", user.avatar)
                }
            }

            setToken(data.token)
        }
    }
    
        logout() {
            localStorage.clear();
        }
}
