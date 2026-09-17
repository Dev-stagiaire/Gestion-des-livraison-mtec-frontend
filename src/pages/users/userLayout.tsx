import Tabs from '../../components/ui/tabs';
import TabsItem from '../../components/ui/tabsItem';
import UsersIcon from '../../icons/UsersIcon';
import { Outlet, useOutletContext } from 'react-router-dom';
import RoleIcon from '../../icons/RoleIcon';
import PermissionIcon from '../../icons/PermissionIcon';
import { useI18n } from '../../context/AppContext';


type OutletContext = {
    search: string;
}

const UsersLayout = () => {

    const { translator } = useI18n();

    const { search } = useOutletContext<OutletContext>();

    const tabsProps = [
        {to: "/users", name: translator("users"), children: <UsersIcon size="18"/>},
        {to: "/users/role", name: translator("role"), children: <RoleIcon size="18" />},
        {to: "/users/permissions", name: translator("permission"), children: <PermissionIcon size="18" />}
    ];
  

    return (
        <div className='w-full h-full py-7 px-6 '>
            <div className='relative flex flex-col gap-5 h-full w-full px-8 py-2 shadow-sm overflow-auto'>
                    <Tabs >
                        {
                            tabsProps.map((props) => {
                                return(
                                    <TabsItem to={props.to} name={props.name} >
                                        {props.children}
                                    </TabsItem>
                                );
                            })
                        }
                    </Tabs>
                    <main className="flex-1 overflow-auto">
                        <Outlet  context={{ search }}/>
                    </main>
            </div>
        </div>
    )
}

export default UsersLayout
