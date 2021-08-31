import { Nutshell } from '../Nutshell'

export const LogOut = () => {

    sessionStorage.removeItem("nutshell_user")
    Nutshell()
    
}
