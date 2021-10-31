import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "@reach/router";
import { fetchAllStores } from "../features/stores/storesAction";
import Modal from "./shared/Modal";
import { Button } from "@material-ui/core";
import AddStore from "./AddStore";

const StoresTable = () => {
  const { stores, isLoading, error } = useSelector((state) => {
    return state.stores;
  });

  const [pagination, setPagination] = useState({
    size: stores.size || 5,
    currentPage: stores.currentPage || 0,
  });

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllStores({
        size: pagination.size,
        page: pagination.currentPage + 1,
      })
    );
  }, [pagination.currentPage, pagination.size]);

  const columns = [
    {
      field: "logoIcon",
      headerName: "Logo",
      width: 150,
      renderCell: (params) => (
        <img
          className="w-16 rounded-md"
          src={params.row.logo && `/${params.row.logo}`}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "link",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Link
          className="text-blue-500"
          to={`/stores/${params.row.id.toString()}`}
        >
          See more
        </Link>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Create New Store"
        open={open}
        handleClose={handleCloseModal}
      >
        <AddStore
          onSuccess={fetchAllStores.bind(null, {
            size: pagination.size,
            page: pagination.currentPage + 1,
          })}
        />
      </Modal>
      <div className="flex h-[600px]">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="w-full h-full">
            <div className="w-full flex py-2 justify-start">
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
              >
                Add New Store
              </Button>
            </div>
            {stores.data && stores.data.length > 0 ? (
              <div className="w-full h-[70%]">
                <DataGrid
                  rows={stores.data}
                  columns={columns}
                  page={pagination.currentPage}
                  pageSize={pagination.size}
                  rowsPerPageOptions={[5, 10, 15]}
                  paginationMode="server"
                  loading={isLoading}
                  rowCount={stores.count}
                  onPageChange={(params) => {
                    setPagination((pagination) => ({
                      ...pagination,
                      currentPage: params.page,
                    }));
                  }}
                  onPageSizeChange={(params) => {
                    setPagination((pagination) => ({
                      ...pagination,
                      size: params.pageSize,
                    }));
                  }}
                />
              </div>
            ) : (
              <div className="my-4 text-lg font-medium text-gray-300">
                It seems there are no stores yes
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StoresTable;
