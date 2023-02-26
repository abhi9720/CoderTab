import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange, Userlanguage }) => {




    return (
        <Select
            placeholder={`Filter By Category`}
            options={languageOptions}
            styles={customStyles}

            defaultValue={Userlanguage}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;