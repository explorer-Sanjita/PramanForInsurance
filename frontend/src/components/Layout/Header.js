import PramanLogo from "../../assets/logos/pramanLogo.svg";
import {Link, useLocation} from "react-router-dom";

export const Header = ({routesPath}) => {
    const {pathname} = useLocation()
    const renderedRoutes = routesPath.map((data,index)=>{
        return(
            <Link key={index} to={data.path} className={`${(pathname === data.path)?' text-blue-300':''}`} >{data.text}</Link>
        )
    })
    return (
        <nav className={'flex flex-row justify-between mb-10'}>
            <img src={PramanLogo} alt={'Logo'}/>
            <div className={'flex flex-row gap-10 text-white items-center text-lg lg:text-2xl'}>
                {renderedRoutes}
            </div>
        </nav>
    )
}
