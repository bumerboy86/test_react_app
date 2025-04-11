import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteCompanyByIdMutation,
  useLazyGetCompanyByIdQuery,
} from "../../store/services/company_api";
import styles from "./CompanyPage.module.css";
import { CompanyDetails } from "../../components/CompanyDetails/CompanyDetails";

import TrashIcon from "../../assets/Trash.svg";
import EditIcon from "../../assets/Edit_black.svg";

export const CompanyPage = () => {
  const [deleteCompany, { isLoading, isSuccess, data }] =
    useDeleteCompanyByIdMutation();
  const { id } = useParams();
  const [getCompanyById, { data: companyData }] = useLazyGetCompanyByIdQuery();

  useEffect(() => {
    if (isSuccess == true) {
      alert("Компания удалена");
    }

    console.log("isSuccess:", isSuccess);
    console.log("isLoading:", isLoading);
    console.log("data:", data);
  }, [isLoading, isSuccess, data]);

  useEffect(() => {
    getCompanyById(id);
  }, [id]);

  useEffect(() => {
    if (companyData) {
      console.log("Company data:", companyData);
    }
  }, [companyData]);
  return (
    <>
      {companyData ? (
        <div className={styles.company}>
          <section className={styles.company_title}>
            <h4>{companyData?.name}</h4>
            <div className={styles.company_buttons}>
              <button>
                <EditIcon />
              </button>
              <button onClick={() => deleteCompany(id)}>
                <TrashIcon />
              </button>
            </div>
          </section>
          <CompanyDetails companyData={companyData} />
        </div>
      ) : (
        <p>По Вашему запросу компания не найдейдена</p>
      )}
    </>
  );
};
