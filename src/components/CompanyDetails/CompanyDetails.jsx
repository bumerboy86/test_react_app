import React, { useEffect, useState } from "react";
import styles from "./CompanyDetails.module.css";
import { ButtonBrandOutline } from "../Buttons/ButtonBrandOutline";
import EditIcon from "../../assets/Edit.svg";
import Check from "../../assets/Check.svg";
import XIcon from "../../assets/X.svg";
import { formatDateTo } from "../../utils/formatDate";
import Select, { components } from "react-select";
import { usePathCompanyByIdMutation } from "../../store/services/company_api";
import { useDispatch } from "react-redux";
import { setCompany } from "../../store/slices/companySlice";

export const CompanyDetails = ({ companyData }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [patchCompany, { isLoading, isSuccess, data }] =
    usePathCompanyByIdMutation();
  const [updatedData, setUpdatedData] = useState({
    name: companyData?.name,
    shortName: companyData?.shortName,
    contractNo: companyData?.contract.no,
    issueDate: formatDateTo(companyData?.contract.issue_date, "YYYYMMDD", "-"),
    businessEntity: (typeof companyData?.businessEntity === "string"
      ? [companyData.businessEntity]
      : companyData?.businessEntity || [])[0],
    type: companyData?.type || [],
  });

  console.log(companyData);

  useEffect(() => {
    if (companyData) {
      setUpdatedData({
        name: companyData?.name,
        shortName: companyData?.shortName,
        contractNo: companyData?.contract.no,
        issueDate: formatDateTo(
          companyData?.contract.issue_date,
          "YYYYMMDD",
          "-"
        ),
        businessEntity: (typeof companyData?.businessEntity === "string"
          ? [companyData.businessEntity]
          : companyData?.businessEntity || [])[0],
        type: companyData?.type || [],
      });
    }
  }, [editMode]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCompany(data));
    }
  }, [isLoading, isSuccess, data]);

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "16px",
            }}
          />
          <label>{props.label}</label>
        </div>
      </components.Option>
    );
  };

  const MultiValue = (props) => (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      type: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = () => {
    patchCompany({ ...updatedData, id: companyData.id });
    setEditMode(false);
  };

  const typeOptions =
    companyData?.type.map((item) => ({
      value: item,
      label: item,
    })) || [];

  return (
    <section className={styles.company_details}>
      <div className={styles.company_details_functional}>
        <p>Company Details</p>
        {editMode ? (
          <div className={styles.company_details_functional_buttons}>
            <ButtonBrandOutline
              key={"save"}
              fn={handleSubmit}
              image={Check}
              cont={"Save changes"}
            />
            <ButtonBrandOutline
              key={"cancel"}
              fn={() => setEditMode(!editMode)}
              image={XIcon}
              cont={"Cancel"}
            />
          </div>
        ) : (
          <ButtonBrandOutline
            key={"edit"}
            fn={() => setEditMode(!editMode)}
            image={EditIcon}
            cont={"edit"}
          />
        )}
      </div>

      <div className={styles.company_details_item}>
        <p className={styles.company_details_item_title}>Agreement:</p>
        <div className={styles.company_details_item_agreement}>
          {editMode ? (
            <>
              <label htmlFor="contractNo"> number:</label>
              <input
                type="text"
                name="contractNo"
                value={updatedData.contractNo}
                onChange={handleChange}
              />
              <label htmlFor="issueDate"> Date:</label>
              <input
                type="date"
                name="issueDate"
                value={updatedData.issueDate}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <p>{companyData?.contract.no}</p>
              <p>
                {formatDateTo(
                  companyData?.contract.issue_date,
                  "DDMMYYYY",
                  "."
                )}
              </p>
            </>
          )}
        </div>
      </div>

      <div className={styles.company_details_item}>
        <p className={styles.company_details_item_title}>Business entity:</p>
        {editMode ? (
          <select
            name="businessEntity"
            value={updatedData.businessEntity}
            onChange={handleChange}
          >
            {(typeof companyData.businessEntity === "string"
              ? [companyData.businessEntity]
              : companyData.businessEntity
            ).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <p>{companyData?.businessEntity}</p>
        )}
      </div>

      <div className={styles.company_details_item}>
        <p className={styles.company_details_item_title}>Company type:</p>
        <div>
          {editMode ? (
            <Select
              isMulti
              name="type"
              value={updatedData.type.map((value) => ({ value, label: value }))}
              options={typeOptions}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option, MultiValue }}
              onChange={handleSelectChange}
              allowSelectAll={true}
            />
          ) : (
            <p>{updatedData?.type.join(", ")}</p>
          )}
        </div>
      </div>
    </section>
  );
};
