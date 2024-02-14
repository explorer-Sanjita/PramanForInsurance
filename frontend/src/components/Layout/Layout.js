import { useLocation } from "react-router";
import {Header} from "./Header";

const Layout = ({routePath,children}) =>{
    const {pathname} = useLocation()
    console.log(pathname)
    return(
        <div className={'flex flex-col lg:w-3/4 mx-auto mt-8'}>
           {pathname !== '/login' && pathname !== '/signup'?<Header routesPath={routePath}/>:null}
            {children}
        </div>
    )
}
export default Layout