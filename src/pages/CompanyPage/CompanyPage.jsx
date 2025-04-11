import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteCompanyByIdMutation,
  useLazyGetCompanyByIdQuery,
  usePathCompanyByIdMutation,
} from "../../store/services/company_api";
import styles from "./CompanyPage.module.css";
import { CompanyDetails } from "../../components/CompanyDetails/CompanyDetails";

import TrashIcon from "../../assets/Trash.svg";
import EditIcon from "../../assets/Edit_black.svg";
import { clearCompany, setCompany } from "../../store/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { WithTextModal } from "../../components/modals/WithTextModal";

export const CompanyPage = () => {
  const dispatch = useDispatch();
  const [
    patchCompany,
    { isLoading: loadingCompany, isSuccess: successCompany, data: dataCompany },
  ] = usePathCompanyByIdMutation();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { company } = useSelector((state) => state.company);
  const [deleteCompany, { isLoading, isSuccess, data }] =
    useDeleteCompanyByIdMutation();
  const { id } = useParams();
  const [getCompanyById, { data: companyData }] = useLazyGetCompanyByIdQuery();

  const openHandler = () => {
    setOpen(!open);
  };

  const handleSaveCompanyName = async (name) => {
    setLoading(true);
    const values = {
      name,
      shortName: company?.shortName,
      businessEntity: company?.businessEntity,
      contractNo: company?.no,
      issueDate: company?.issue_date,
      type: company?.type,
      id: id,
    };
    patchCompany(values);
  };

  useEffect(() => {
    if (successCompany && dataCompany) {
      alert("Компания обновлена");
      console.log("Company name data", dataCompany);
      dispatch(setCompany(dataCompany));
      setLoading(false);
      setOpen(false);
    }
  }, [loadingCompany, successCompany, dataCompany]);

  const handleDelete = async () => {
    await dispatch(clearCompany());
    alert("Компания удалена");
  };

  useEffect(() => {
    if (isSuccess == true) {
      handleDelete();
    }
  }, [isLoading, isSuccess, data]);

  useEffect(() => {
    getCompanyById(id);
  }, [id]);

  useEffect(() => {
    if (companyData) {
      dispatch(setCompany(companyData));
      console.log("Company data:", companyData);
    }
  }, [companyData]);
  return (
    <>
      <WithTextModal
        open={open}
        setOpen={openHandler}
        title="Specify the Organization's name"
        cont={company?.name}
        fn={handleSaveCompanyName}
        btn_cancel="Cancel"
        placeholder="Enter the name of the company"
        isFetching={loading}
      />
      {company ? (
        <div className={styles.company}>
          <section className={styles.company_title}>
            <h4>{company?.name}</h4>
            <div className={styles.company_buttons}>
              <button onClick={openHandler}>
                <EditIcon />
              </button>
              <button onClick={() => deleteCompany(id)}>
                <TrashIcon />
              </button>
            </div>
          </section>
          <CompanyDetails companyData={company} />
        </div>
      ) : (
        <p>По Вашему запросу компания не найдейдена</p>
      )}
    </>
  );
};
