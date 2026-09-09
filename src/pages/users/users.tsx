import Table from '../../components/ui/tables';
import Pagination from '../../components/ui/pagination';
import { createUser, getUsers, updateUser } from '../../api/users.api';
import { useEffect, useMemo, useState } from 'react';
import type { Role, User } from '../../api/Auth/interfaces/user.interface';
import { useFecthData } from '../../hooks/FetchData';
import { useOutletContext } from 'react-router-dom';
import Modal from '../../components/ui/modal';
import Input from '../../components/ui/input';
import { useI18n } from '../../context/AppContext';
import EditIcon from '../../icons/EditIcon';
import Dropdown from '../../components/ui/dropdown';
import { getRoles } from '../../api/role.api';


type OutletContext = {
    search: string;
}

const Users = () => {

    const {translator} = useI18n();

    const { search } = useOutletContext<OutletContext>();
    
    const [pagination, setPagination] = useState({
        limit: 10,
        offset: 0,
    });

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            offset: 0,
        }));
    }, [search]);

    const queryData = useMemo(() => ({
        ...pagination,
        search_term: search,
    }), [pagination, search]);

    const { results: users, count, refresh } = useFecthData(getUsers, queryData);

    const rows = useMemo(() => {
        return users.map((user) => [
            user.first_name,
            user.email,
            user.phone,
            user.role.name,
           <span
                className={`px-2 py-1 rounded-lg ${
                    user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
            >
                {user.is_active ? translator("active") : translator("inactive")}
            </span>,
            <button
                type="button"
                onClick={() => {
                    setEditUserModal(true);
                    setUserEdit(user);
                }}
                className="p-1 text-gray-700 hover:text-[#23356A]"
            >
                <EditIcon size="22" />
            </button>
        ]);
    }, [users]);

    // const keys: (keyof User)[] = ["first_name", "email", "phone", "role", "Status"];
    const keys: string[] = [translator("firstname"), translator("email"), translator("phone"), translator("role"), translator("status")];

    const hasNext = queryData.offset + queryData.limit < count;
    const hasPrev = queryData.offset > 0;

    const handleNext = () => {
        setPagination((prev) => ({
            ...prev,
                offset: prev.offset + prev.limit 
        }));
    }

    const handlePrev = () => {
        setPagination((prev) => ({
            ...prev,
            offset: Math.max(0, prev.offset - prev.limit)
        }));
    }
   

    const [showAddUser, setAddUserModal] = useState(false);
    const [showEditUser, setEditUserModal] = useState(false);
    const [userEdit, setUserEdit] = useState<User>({
        id: 0,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        is_active: false,
        avatar_url: "",
        role: undefined,
    });

    useEffect(() => {
        
    }, [userEdit]);

    const { results: roles } = useFecthData(getRoles, pagination);

    const roleOptions = roles.map((role) => ({
            label: role.name,
            value: role.id
    }));

    const handleUserEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            first_name: userEdit.first_name,
            last_name: userEdit.last_name,
            phone: userEdit.phone,
            email: userEdit.email,
            is_active: userEdit.is_active,
            avatar_url: userEdit.avatar_url,
            role_id: userEdit.role?.id,
        };

        try {
            await updateUser(userEdit.id, data);
            await refresh();
            setEditUserModal(false);
        } catch (error) {
            console.error("Erreur lors de la modification :", error);
        }
    };


    const [firstname, setFirstname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, SetSelectedRole] = useState<Role | undefined>();

    const [formData, setFormData] = useState({
        role_id: selectedRole?.id
    });

    const handleAddUserSubmit = async () => {

        try {
            const data = {
                ...formData,
                firstname: firstname,
                phone: phone,
                email: email,
            }
            console.dir(data);
            // await createUser(formData);
            // await refresh();
            setAddUserModal(false);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    }

    return (
            
        <div className='relative flex flex-col gap-5 h-full w-full pb-5 overflow-auto'>


            {showEditUser && (
                <Modal title={translator("edit_user")} width="750" onClose={() => setEditUserModal(false)}>
                    <form 
                        className="w-full space-y-5"
                        onSubmit={handleUserEditSubmit}
                    >

                        {/* First name */}
                        <Input
                            id="firstname"
                            label={translator("firstname")}
                            type="text"
                            value={userEdit.first_name ?? ""}
                            onChange={(e) =>  setUserEdit(prev => ({
                                    ...prev,
                                    first_name: e.target.value
                                })
                            )}
                        />

                        {/* Last name */}
                        <Input
                            id="lastname"
                            label={translator("lastname")}
                            type="text"
                            value={userEdit.last_name ?? ""}
                            onChange={(e) =>  setUserEdit(prev => ({
                                    ...prev,
                                    last_name: e.target.value
                                })
                            )}
                        />

                        {/* Avatar URL */}
                        <Input
                            id="avatar_url"
                            label={translator("avatar_url")}
                            type="text"
                            value={userEdit.avatar_url ?? ""}
                            onChange={(e) => setUserEdit(prev => ({
                                    ...prev,
                                    avatar_url: e.target.value
                                })
                            )}
                        />

                        {/* Phone */}
                        <Input
                            id="phone"
                            label={translator("phone")}
                            type="text"
                            value={userEdit.phone ?? ""}
                            onChange={(e) => setUserEdit(prev => ({
                                    ...prev,
                                    phone: e.target.value
                                })
                            )}
                        />

                        {/* Role */}
                        <Dropdown
                            title="Role"
                            value={userEdit.role?.name}
                                    
                            options={
                                roles?.map((role) => ({
                                    title: role.name,
                                    value: role.id,
                                    onClick: () => 
                                        setUserEdit((prev) => ({
                                            ...prev,
                                            role: role,
                                        })),
                                })) ?? []
                            }
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="flex h-[50px] w-full items-center justify-center gap-3 bg-[#1f2e54] text-sm font-medium text-white transition-all duration-300 hover:gap-4"
                        >
                            {translator("update")}
                        </button>

                    </form>
                </Modal>
            )}


            {showAddUser && (
                <Modal title={translator("add_user")} width='750' onClose={() => setAddUserModal(false)}>
                    <form
                        className="w-full space-y-5"
                        onSubmit={handleAddUserSubmit}
                    >

                        {/* Username */}
                        <Input 
                            id="firstname"
                            label={translator("firstname")}
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />

                        {/* Email */}
                        <Input 
                            id="email"
                            label={translator("email")}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Phone */}
                        <Input 
                            id="phone"
                            label={translator("phone")}
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                       <Dropdown
                            title="Role"
                            options={
                                roles?.map((role) => ({
                                    title: role.name,
                                    value: role.id,
                                    onClick: () =>
                                        {
                                            setFormData((prev) => ({
                                                ...prev,
                                                role_id: role.id,
                                            })),
                                            SetSelectedRole(role)
                                        }
                                       
                                })) ?? []

                            }
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="flex h-[50px] w-full items-center justify-center gap-3 bg-[#1f2e54] text-sm font-medium text-white transition-all duration-300 hover:gap-4"
                        >
                            {translator("add")}
                        </button>

                    </form>
                </Modal>
            )}    
            <div className='flex justify-end'>
                <button
                    onClick={() => setAddUserModal(true)}
                    className="relative h-10 w-auto px-3 py-1.5 text-sm bg-[#23356A]/90 text-white hover:bg-[#23356A] rounded-sm"
                >
                    {translator("add_user")}
                </button>
            </div>
            <Table headers={keys} rows={rows}/>
            <Pagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                count={count}
                offset={queryData.offset}
                limit={queryData.limit}
                hasNext={hasNext}
                hasPrev={hasPrev}
            />
        </div>
    )
}

export default Users
