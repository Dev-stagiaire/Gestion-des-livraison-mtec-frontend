import { useOutletContext } from "react-router-dom";
import { useI18n } from "../../../context/AppContext";
import { useEffect, useMemo, useState } from "react";
import { createPermission, getPermissions, updatePermission } from "../../../api/permissions.api";
import { useFecthData } from "../../../hooks/FetchData";
import type { Permission } from "../../../api/Auth/interfaces/user.interface";
import Modal from "../../../components/ui/modal";
import Input from "../../../components/ui/input";
import Table from "../../../components/ui/tables";
import Pagination from "../../../components/ui/pagination";
import InlineEdit from "../../../components/forms/inlineedit";

type OutletContext = {
    search: string;
}

const Permissions = () => {

    const modalWidth = "500";
    const modalHeight = "309";

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

  const { results: permissions, count , refresh} = useFecthData(getPermissions, queryData);

  const hasNext = queryData.offset + queryData.limit < count;
  const hasPrev = queryData.offset > 0;

  const keys: string[]  = [translator("name")];
  const [refreshKey, setRefreshKey] = useState(0);

  const rows = useMemo(() => {
      return permissions.map((permission) => [
            <InlineEdit
                item={
                    {
                        id: permission.id,
                        value: permission.name
                    }
                }
                editFunction={updatePermission}
                setRefreshKey={setRefreshKey}
            />
      ]);
  }, [permissions]);

 useEffect(() => {
    const fetchData = async () => {
        await refresh();
    };

    fetchData();
}, [refreshKey]);

  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
    });

  const handleAddPermissionSubmit = async () => {

      try {
          await createPermission(formData);
          await refresh();
          setShowAddPermissionModal(false);
      } catch (error) {
          console.error("Erreur lors de l'enregistrement :", error);
      }
  }

    const resetForm = () => {
        setFormData({
            name: ""
        });
    };

    const handleCancel = () => {

        try {
            resetForm();
            setShowAddPermissionModal(false)
        } catch (error) {
            console.error(error.message);
        }
    }


  return (
      <div className='relative flex flex-col gap-5 h-full w-full pb-5 overflow-auto'>
                {showAddPermissionModal && (
                <Modal
                    title={translator("add_permission")}
                    onClose={() => handleCancel()}
                    width={modalWidth} height={modalHeight}
                    className="px-8"
                >
                    <form
                        className="w-full space-y-5 py-6 px-8"
                        onSubmit={handleAddPermissionSubmit}
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
                   
                         <div className='relative flex justify-end gap-3'>

                             {/* Cancel */}
                            <button
                                type="submit"
                                className="flex h-[40px] w-auto px-8 rounded items-center justify-center gap-3 text-sm font-medium bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-gray-200"
                                onClick={ () => handleCancel()}
                            >
                                {translator("cancel")}
                            </button>

                             {/* Submit */}
                            <button
                                type="submit"
                                className="flex h-[40px] w-auto px-8 rounded items-center justify-center gap-3 bg-[#1f2e54] text-sm font-medium text-white transition-all duration-300 hover:gap-4"
                            >
                                {translator("add")}
                            </button>

                        </div>

                    </form>
                </Modal>
            )}    
            <div className='flex justify-end'>
                <button
                    onClick={() => setShowAddPermissionModal(true)}
                    className="relative h-10 w-auto px-3 py-1.5 text-sm bg-[#23356A]/90 text-white hover:bg-[#23356A] rounded-sm"
                >
                    {translator("add_permission")}
                </button>
            </div>
            <Table
                headers={keys}
                rows={rows}
            />
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

export default Permissions
