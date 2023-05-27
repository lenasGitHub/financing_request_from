import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../contexts/app.context";

const Country = ({ register, setValue, watch, errors }) => {
  const [countries, setCountries] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState(false);
  const opecMemberCountries = [
    "DZA",
    "AGO",
    "COD",
    "GNQ",
    "GAB",
    "IRN",
    "IRQ",
    "KWT",
    "LBY",
    "NGA",
    "SAU",
    "ARE",
    "VEN",
  ];

  const { appDispatch } = useContext(AppContext);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountry(false);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const sortedCountries = response.data.sort((a, b) => {
          const countryA = a.name.common.toUpperCase();
          const countryB = b.name.common.toUpperCase();
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        });
        setLoadingCountry(true);
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value, { shouldValidate: true });
    if (opecMemberCountries.includes(value)) {
      setValue("currency", "USD", { shouldValidate: true });
      appDispatch({
        type: "SET_IS_OPEC_MEMBER",
        payload: { isOpecMember: true },
      });
    } else {
      setValue("currency", "");

      appDispatch({
        type: "SET_IS_OPEC_MEMBER",
        payload: { isOpecMember: false },
      });
    }
  };
  return (
    <div>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-last-name"
      >
        Origin Country
      </label>

      <div className="relative">
        {!loadingCountry && (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="absolute right-4 top-3"
          />
        )}
        <select
          className={`appearance-none rounded-lg  border ${
            watch("country") ? "text-gray" : "text-gray-400"
          } block flex-1 min-w-0 w-full text-sm p-2.5   border-gray-600    outline-0 outline-black`}
          {...register("country")}
          onChange={handleCountryChange}
        >
          <option value="" >
            Select Currency
          </option>
          {countries.map((country) => (
            <option key={country.cca3} value={country.cca3}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>
      {errors.country && (
        <p className="text-red-500 text-xs italic">{errors.country.message}</p>
      )}
    </div>
  );
};

export default Country;
