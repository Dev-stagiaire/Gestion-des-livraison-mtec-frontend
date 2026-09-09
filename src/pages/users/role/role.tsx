import { useEffect, useMemo, useState } from "react"
import Input from "../../../components/ui/input"
import Modal from "../../../components/ui/modal"
import Pagination from "../../../components/ui/pagination"
import Table from "../../../components/ui/tables"
import { useI18n } from "../../../context/AppContext"
import { useOutletContext } from "react-router-dom"
import type { Role } from "../../../api/Auth/interfaces/user.interface"
import { useFecthData } from "../../../hooks/FetchData"
import { createRole, getRoles, updateRole } from "../../../api/role.api"
import MultiSelect from "../../../components/forms/multiselect"
import { getAllPermissions } from "../../../api/permissions.api"
import { useSearch } from "../../../hooks/asyncSearch"
import EditIcon from "../../../icons/EditIcon"

type OutletContext = {
    search: string;
}

const Role = () => {

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

    const { results: roles, count , refresh} = useFecthData(getRoles, pagination);

    const hasNext = queryData.offset + queryData.limit < count;
    const hasPrev = queryData.offset > 0;

    const keys: (keyof Role)[] = ["name", "permissions"];

    const rows = useMemo(() => {
        return roles.map((role) => [
            role.name,
            <div className="relative w-full flex gap-2 flex-wrap overflow-x-auto text-xs">
                {
                    role.permissions.map((permission) => (
                        <span key={permission.id} className="flex items-center rounded bg-gray-100 px-2 py-1 text-xs">
                            {permission.name}
                        </span>
                    ))       
                }
            </div>,
            <button
                type="button"
                onClick={() => {
                    setEditRoleModal(true);
                    setEditedRole(prev => ({
                        ...prev,
                        role_id: role.id,
                        name: role.name,
                        permission_ids: role.permissions.map((permission) => permission.id)
                    }));
                }}
                className="p-1 text-gray-700 hover:text-[#23356A]"
            >
                <EditIcon size="22" />
            </button>
        ]);
    }, [roles]);

    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [editRoleModal, setEditRoleModal] = useState(false);

    const [editedRole, setEditedRole] = useState({
        role_id: 0,
        name: "",
        permission_ids: [],
    });

    useEffect(() => {

        if (editRoleModal) {
            setSelectedPermissions(editedRole.permission_ids);
        }
        else{
            setSelectedPermissions([]);
        }
    }, [editRoleModal])

    const [formData, setFormData] = useState({
        name: "",
    });

    const handleAddRoleSubmit = async () => {

        try {
            const data = {
                ...formData,
                permission_ids: selectedPermissions.map((value) => Number(value)),
            };
            await createRole(data);
            await refresh();
            setShowAddRoleModal(false);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    }


    const { results: permissions } =  useFecthData(getAllPermissions);
    const [permissions_, setPermissions_] = useState(permissions);
    const [search_term, setSearchTerm] = useState("");

    useEffect(() => {
            const fetchData = async () => {
                console.log(search_term);
                const results = await useSearch("name", search_term, permissions);
                setPermissions_(results);
            }
            fetchData();
    },[search_term, permissions]);

    const permissionOptions = permissions_.map((permission) => ({
            label: permission.name,
            value: permission.id
    }));


    const handleRoleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            name: editedRole.name,
            permission_ids: selectedPermissions.map(Number),
        };

        try {
            await updateRole(editedRole.role_id, data);
            await refresh();
            setEditRoleModal(false);
        } catch (error) {
            console.error("Erreur lors de la modification :", error);
        }
    };

  
  return (
    <div className='relative flex flex-col gap-5 h-full w-full pb-5 overflow-auto'>
                {showAddRoleModal && (
                <Modal title={translator("add_role")} width='750' onClose={() => setShowAddRoleModal(false)}>
                    <form
                        className="w-full space-y-5"
                        onSubmit={handleAddRoleSubmit}
                    >

                        {/* Name */}
                        <Input 
                            id="name"
                            label={translator("name")}
                            type="text"
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                name: e.target.value,
                            }))}
                            required
                        />

                        <MultiSelect
                            options={permissionOptions}
                            value={selectedPermissions}
                            onChange={setSelectedPermissions}
                            placeholder="Sélectionner les rôles"
                            translator={translator}
                            setValue={setSearchTerm}
                        />

                        <button
                            type="submit"
                            className="flex h-[50px] w-full items-center justify-center gap-3 bg-[#1f2e54] text-sm font-medium text-white transition-all duration-300 hover:gap-4"
                        >
                            {translator("add")}
                        </button>

                    </form>
                </Modal>
            )} 
                {editRoleModal && (
                <Modal title={translator("edit_role")} width='750' onClose={() => setEditRoleModal(false)}>
                    <form
                        className="w-full space-y-5"
                        onSubmit={handleRoleEditSubmit}
                    >

                        {/* Name */}
                        <Input 
                            id="name"
                            label={translator("name")}
                            type="text"
                            value={editedRole.name}
                            onChange={(e) => setEditedRole(prev => ({
                                ...prev,
                                name: e.target.value,
                            }))}
                            required
                        />

                        <MultiSelect
                            options={permissionOptions}
                            value={selectedPermissions}
                            onChange={setSelectedPermissions}
                            placeholder="Sélectionner les rôles"
                            translator={translator}
                            setValue={setSearchTerm}
                        />

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
                    onClick={() => setShowAddRoleModal(true)}
                    className="relative h-10 w-auto px-3 py-1.5 text-sm bg-[#23356A]/90 text-white hover:bg-[#23356A] rounded-sm"
                >
                    {translator("add_role")}
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

export default Role
